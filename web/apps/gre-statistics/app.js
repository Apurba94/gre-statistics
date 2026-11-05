/* Statistics Trainer: mean, median, range, spread and quartiles, with a calculator for your own data. */
(function () {
  'use strict';
  const NAMES = SK.QUANT_TOPICS.stats.concat(['qcAverage']);
  // Describe a list of numbers. Quartiles use the GRE convention: the medians of the lower and upper halves.
  const describe = (xs) => {
    const s = xs.slice().sort((a, b) => a - b), n = s.length;
    const med = (a) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2);
    const mean = SK.sum(s) / n;
    const counts = {};
    s.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
    const top = Math.max(...Object.values(counts));
    const modes = top > 1 ? Object.keys(counts).filter((k) => counts[k] === top).map(Number) : [];
    const lower = s.slice(0, Math.floor(n / 2)), upper = s.slice(Math.ceil(n / 2));
    return { n, mean, median: med(s), modes, range: s[n - 1] - s[0], sd: Math.sqrt(SK.sum(s.map((x) => (x - mean) ** 2)) / n), q1: n > 1 ? med(lower) : s[0], q3: n > 1 ? med(upper) : s[0] };
  };
  const App = {
    about: 'Data analysis is a quarter of GRE Quant. Practise mean, median, range, standard deviation and comparisons with generated data, and use the calculator to describe any list of numbers, including quartiles and the population standard deviation the GRE uses.',
    how: ['Practise in **Practice**.', 'Type a list in **Calculator** to check your work or explore how one value changes the mean but not the median.', 'Remember: adding the same number to every value does not change the standard deviation.'],
    tabs: [
      SK.quantTab('practice', 'Practice', NAMES),
      { id: 'calc', label: 'Calculator', render(el) {
        const out = SK.h('div', {});
        const inp = SK.h('input', { type: 'text', value: '4, 8, 15, 16, 23, 42', style: { width: '100%' }, 'aria-label': 'Numbers', oninput: () => show() });
        const show = () => {
          SK.clear(out);
          const xs = (inp.value.match(/-?\d+(\.\d+)?/g) || []).map(Number);
          if (xs.length < 1) { out.appendChild(SK.note('Type some numbers separated by commas or spaces.', 'wrong')); return; }
          const d = describe(xs);
          out.appendChild(SK.stats([['Count', d.n], ['Mean', SK.round(d.mean, 3)], ['Median', SK.round(d.median, 3)], ['Mode', d.modes.length ? d.modes.join(', ') : 'none'], ['Range', SK.round(d.range, 3)], ['Std. deviation', SK.round(d.sd, 3)], ['Q1', SK.round(d.q1, 3)], ['Q3', SK.round(d.q3, 3)]]));
        };
        el.appendChild(SK.card('Describe your data', SK.field('Numbers', inp), out, SK.h('p', { class: 'sk-small sk-muted', text: 'Standard deviation here is the population version, dividing by n, which is what GRE questions use.' })));
        show();
      } },
    ],
    describe,
    checks: {
      'the calculator gives textbook answers': (data, assert) => {
        const d = describe([2, 4, 4, 4, 5, 5, 7, 9]);
        assert.equal(d.mean, 5); assert.equal(d.median, 4.5); assert.deepEqual(d.modes, [4]); assert.equal(d.range, 7); assert.equal(d.sd, 2);
        assert.equal(describe([1, 2, 3, 4, 5, 6, 7]).q1, 2); assert.equal(describe([1, 2, 3, 4, 5, 6, 7]).q3, 6);
        const shifted = describe([12, 14, 14, 14, 15, 15, 17, 19]);
        assert.equal(shifted.sd, d.sd, 'adding a constant leaves the spread unchanged');
        assert.deepEqual(describe([3, 1, 2]).modes, []);
      },
      'generated sets are valid': (data, assert) => { for (let s = 1; s < 30; s++) for (const q of SK.makeQuant(NAMES, 10, s)) assert.deepEqual(SK.validateItem(q), []); },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
