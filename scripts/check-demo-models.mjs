import assert from "node:assert/strict";
import { forecast, proposalFee, money } from "../public/demos/demo.mjs";
assert.equal(proposalFee(), 2100);
assert.equal(proposalFee(true), 2450);
assert.equal(money(-0), "$0");
assert.deepEqual(
  forecast().map((r) => r.closing),
  [60000, 65000, 70000],
);
assert.deepEqual(
  forecast({ equipment: 12000, hire: 5000, collectionMonth: 3 }).map(
    (r) => r.closing,
  ),
  [23000, 23000, 43000],
);
assert.ok(
  forecast({ equipment: 20000, hire: 10000, collectionMonth: 3 }).some(
    (r) => r.closing < 0,
  ) === false,
);
for (const collectionMonth of [1, 2, 3]) {
  const rows = forecast({ equipment: 12000, hire: 5000, collectionMonth });
  assert.equal(
    rows.reduce((total, r) => total + r.collections, 0),
    20000,
  );
  assert.equal(
    rows.reduce((total, r) => total + r.purchase, 0),
    12000,
  );
  assert.equal(rows.at(-1).closing, 43000);
  for (const r of rows)
    assert.equal(
      r.closing,
      r.opening + 5000 + r.collections - r.purchase - r.hire,
    );
}
console.log("Demo proposal and cash-scenario model checks passed.");
