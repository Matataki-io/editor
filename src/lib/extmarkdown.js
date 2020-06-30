const tokenizeRules = [
  {
    regexp: /[^\[`]+/mg,
    block: 'text'
  },
  {
    regexp: /^\[read[^\]]+\](?!\()/mg,
    block: 'readOpen'
  },
  {
    regexp: /^\[\/read\](?!\()/mg,
    block: 'readClose'
  },
  {
    regexp: /^\[else\](?!\()/mg,
    block: 'else'
  },
  {
    regexp: /^```/mg,
    block: 'code'
  },
  {
    regexp: /(\[|`)/mg,
    block: 'text'
  }
];

const lockSvg = '<svg width="10" height="12" xmlns="http://www.w3.org/2000/svg"><path style="fill: white" d="M4.59.011c.395 0 .776.074 1.143.223.366.148.692.352.976.611.284.26.513.563.686.909.173.346.26.716.26 1.112v1.829H6.158V3.212c0-.52-.146-.923-.439-1.211-.292-.289-.686-.433-1.18-.433-.445 0-.803.144-1.075.433-.272.288-.408.692-.408 1.21V4.72H1.5V2.866c0-.396.078-.766.235-1.112.156-.346.373-.65.649-.909.276-.26.601-.463.976-.611A3.314 3.314 0 014.59.01zM9.271 8.44V10.082c0 .223-.039.433-.117.631a1.521 1.521 0 01-.321.507 1.489 1.489 0 01-1.094.457H1.487c-.223 0-.424-.04-.606-.117a1.401 1.401 0 01-.772-.797 1.598 1.598 0 01-.105-.581v-3.93c0-.23.08-.424.24-.58a.78.78 0 01.563-.236h7.65c.23 0 .424.079.58.235.157.157.235.35.235.58V8.44z"/></svg>'
const unlockSvg = '<svg width="13" height="12" xmlns="http://www.w3.org/2000/svg"><path style="fill: white" d="M9.297.011c.395 0 .777.074 1.143.223.367.148.692.352.976.611.285.26.513.563.686.909.173.346.26.716.26 1.112v1.829h-1.496V3.212c0-.52-.146-.923-.438-1.211-.293-.289-.686-.433-1.18-.433-.445 0-.804.144-1.076.433-.271.288-.407.692-.407 1.21V4.72H6.208V2.866c0-.396.078-.766.234-1.112.157-.346.373-.65.65-.909.275-.26.6-.463.975-.611A3.314 3.314 0 019.297.01zM9.272 8.44V10.082c0 .223-.039.433-.117.631a1.521 1.521 0 01-.321.507 1.489 1.489 0 01-1.094.457H1.487c-.223 0-.424-.04-.606-.117a1.401 1.401 0 01-.772-.797 1.598 1.598 0 01-.105-.581v-3.93c0-.23.08-.424.24-.58a.78.78 0 01.563-.236h7.65c.23 0 .424.079.58.235.157.157.235.35.235.58V8.44z"/></svg>'

export function formatReadTags(content, displayMode) {
  const ast = parse(content)
  let α = 0,
    β = '';
  while (α < ast.length) {
    if (ast[α].block === 'read') {
      const hide = attrBoolean(ast[α].attributes.hide, false);
      const hold = attrMines(ast[α].attributes.hold);
      const innerText = ast[α].innerText;
      const elseText = ast[α].elseText;
      β += render(innerText, elseText, hold, hide, displayMode)
      α++;
      continue;
    }
    β += ast[α].value;
    α++;
  }
  return β;
}

function render(innerText, elseText, hold, hide, displayMode) {
  let html = '';
  if (displayMode === 0 || displayMode === 1) {
    html += `<div class="unlock-content${displayMode === 1 ? ' alone-show' : ''}">\n` +
            `<div class="lock-bg">\n` +
            unlockSvg +
            `</div>\n` +
            innerText +
            `</div>`;
  }
  if (hide) return html;

  if (displayMode === 0 || displayMode === 2) {
    const list = conditionList(hold);
    if (!html) html += '\n'
    html += `<div class="unlock-prompt${displayMode === 2 ? ' alone-show' : ''}">\n` +
            `<div class="lock-bg">\n` +
            lockSvg +
            `</div>\n` +
            (elseText && elseText.trim() !== 'Hidden content' ? elseText + '\n<hr />' : '') +
            `<div>\n<h4 class="condition-title">\n隐藏内容，满足以下条件解锁:\n</h4>\n` +
            list +
            `</div>\n</div>`;
  }
  return html;
}

function conditionList(need) {
  // 条件列表
  let list = ''
  for (let i = 0; i < need.length; i++) {
    list += `\n<div class="condition fl">` +
        `<p style="flex: 1">` +
        `持有：${need[i].amount / 10000} ${need[i].token}` +
        `</p>\n</div>`
  }
  return list
}

function regMatch(str, reg, pos) {
  reg.lastIndex = pos;
  const $ = reg.exec(str);
  return $ && $.index === pos ? $ : null;
}

function parse(text) {
  let tokenized = tokenize(text);
  let α = 0, // index
    β = [], // accumlator
    Γ = {inRead:false,inCode:false},
    currentRead = null;  // context
  while (α < tokenized.length) {
    if (tokenized[α].block == 'code') {
      Γ.inCode = !Γ.inCode;
    }
    if (tokenized[α].block == 'readOpen' && !Γ.inCode && !Γ.inRead) {
      Γ.inRead = 'then';
      currentRead = {block : 'read',
        value : tokenized[α].value,
        innerText : '',
        attributes : parseReadOpen(tokenized[α])};
      α++; continue;
    }
    if (tokenized[α].block == 'else' && !Γ.inCode && Γ.inRead == 'then') {
      Γ.inRead = 'else';
      currentRead.value += tokenized[α].value;
      currentRead.elseText = '';
      α++; continue;
    }
    if (tokenized[α].block == 'readClose' && !Γ.inCode && Γ.inRead) {
      Γ.inRead = false;
      currentRead.value += tokenized[α].value;
      β.push(currentRead);
      currentRead = null;
      α++; continue;
    }
    if (Γ.inRead == 'then') {
      currentRead.value += tokenized[α].value;
      currentRead.innerText += tokenized[α].value;
      α++; continue;
    }
    if (Γ.inRead == 'else') {
      currentRead.value += tokenized[α].value;
      currentRead.elseText += tokenized[α].value;
      α++; continue;
    }
    β.push(tokenized[α]);
    α++;
  }
  if (currentRead) {
    β.push({block:'text',value:currentRead.value});
  }
  return β;
}

function tokenize(text) {
  let α = 0,
    β = [];
  while (α < text.length) {
    for (const { regexp, block } of tokenizeRules) {
      const $ = regMatch(text, regexp, α);
      if ($) {
        α = regexp.lastIndex;
        β.push({ block, value: $[0] });
        break;
      }
    }
  }
  return β;
}

function look(tokens, n, type) {
  return tokens[n] && tokens[n].block === type;
}

function lookseq(tokens, n, ...types) {
  let α = 0;
  while (α < types.length) {
    if (!look(tokens, n + α, types[α])) return false;
    α++;
  }
  return true;
}

function parseReadOpen(readOpen) {
  const reg = /(\w+)\s*=\s*"([^"]*)"/g;
  let β = {};
  let $ = reg.exec(readOpen.value);
  while ($ != null) {
    β[$[1]] = $[2];
    $ = reg.exec(readOpen.value);
  }
  return β;
}

function attrBoolean(val, def) {
  return val
    ? val === 'false' || val === '0' || val === 'null' || val === 'undefined'
      ? false
      : true
    : def;
}

/** 将字符串解码成Fan票列表 */
function attrMines(val) {
  const reg = /([A-Z]+)\s*(\d*\.?\d*)/g;
  let β = [];
  if (val) {
    let $ = reg.exec(val);
    while ($ != null) {
      β.push({ token: $[1], amount: Number($[2]) * 10000 });
      $ = reg.exec(val);
    }
  }
  return β;
}
