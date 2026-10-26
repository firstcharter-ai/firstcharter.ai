export const money = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n === 0 ? 0 : n);
export function proposalFee(followup = false) {
  return 2100 + (followup ? 350 : 0);
}
export function forecast({
  equipment = 0,
  hire = 0,
  collectionMonth = 1,
} = {}) {
  let cash = 35000;
  return [1, 2, 3].map((month) => {
    const opening = cash,
      collections = month === collectionMonth ? 20000 : 0,
      purchase = month === 1 ? equipment : 0;
    cash = opening + 5000 + collections - purchase - hire;
    return { month, opening, collections, purchase, hire, closing: cash };
  });
}
const sources = {
  notes: [
    "Discovery notes",
    "FICTIONAL CLIENT · Independent operations consultant\n\nA small service firm wants a half-day workshop for six staff members to improve client handoffs. Deliver a short process guide afterward. Target: next month.\n\nOpen question: who approves the scope?\n\nNo system integration or ongoing delivery requested.",
  ],
  rates: [
    "Approved service menu",
    "SAMPLE CONSULTANT RATES · Not First Charter AI pricing\n\nDiscovery & preparation: 2 hours × $175 = $350\nWorkshop preparation & facilitation: 6 hours × $175 = $1,050\nWritten process guide: 4 hours × $175 = $700\nOptional follow-up: 2 hours × $175 = $350\n\nScope changes require approval. Travel and taxes excluded.",
  ],
  calendar: [
    "Calendar",
    "FICTIONAL WEEK · Sample schedule\n\nTuesday 10:00–10:30 · Accountant call (video)\nTuesday 10:00–11:30 · Home installer visit (at home)\nThursday 14:00–15:30 · Open\nFriday 09:00 · Send travel preferences\n\nInstaller email offers Thursday at 14:00 as an alternative.",
  ],
  correspondence: [
    "Correspondence",
    "FICTIONAL EMAILS\n\nInstaller: We can visit Tuesday at 10:00 or Thursday at 14:00. Please confirm which suits you.\n\nHome project quote: Materials $2,400. Labor and disposal listed as “to be confirmed.” Please approve.\n\nTravel adviser: Please send your preferred departure window by Friday.",
  ],
  preferences: [
    "Personal preferences",
    "FICTIONAL CLIENT PREFERENCES\n\nKeep appointments from overlapping.\nAsk for complete costs before approving home projects.\nPrepare replies for review; never send automatically.\nAvoid early-morning departures when practical.",
  ],
  actuals: [
    "Last month’s records",
    "FICTIONAL SERVICE BUSINESS · Simplified records\n\nRevenue earned: $60,000\nOperating expenses incurred and paid: $45,000\nProfit: $15,000\n\nCash at start of month: $40,000\nCash collected from customers: $40,000\nCash paid: $45,000\nCash at month-end: $35,000\n\nNo taxes, debt, depreciation, or owner distributions in this simplified example.",
  ],
  invoices: [
    "Outstanding invoices",
    "FICTIONAL RECEIVABLES · At month-end\n\nInvoice A: $12,000 · 15 days overdue\nInvoice B: $8,000 · 5 days overdue\nTotal outstanding: $20,000\n\nThese amounts are included in last month’s earned revenue, but not last month’s cash receipts.",
  ],
  assumptions: [
    "Planning assumptions",
    "FICTIONAL THREE-MONTH CASH PLAN\n\nOpening bank balance: $35,000\nExpected monthly collections from NEW work: $50,000\nExisting monthly cash costs: $45,000\nOld invoices: $20,000 collected once, in the selected month\nEquipment: one upfront payment in month 1\nAdditional staff: recurring cash cost each month\n\nNo taxes, financing, owner draws, depreciation, or other working-capital changes modeled. This is a cash illustration, not a full financial forecast.",
  ],
};
const sourceButton = (key, label) =>
  `<button class="source" data-source="${key}">${label || sources[key][0]}</button>`;
const cite = (key, label) =>
  `<button class="citation" data-source="${key}">${label}</button>`;
function metric(label, value) {
  return `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`;
}
function helm() {
  return `<div class="workspace"><aside class="inputs"><h2>Working context</h2><p>An independent consultant is preparing a workshop proposal.</p>${sourceButton("notes")}${sourceButton("rates")}<div class="controls"><label class="check"><input id="approver" type="checkbox"> Client has confirmed the operations director can approve the scope.</label><label class="check"><input id="followup" type="checkbox"> Include the optional follow-up session.</label><p>Change the inputs, then prepare a new draft.</p><button class="btn" id="prepare">Prepare proposal</button></div></aside><section class="output" aria-label="Proposal workspace"><h2>From conversation to client-ready draft</h2><p>Start with the source notes and approved rates. Resolve the open question, choose the scope, and prepare a proposal.</p><div id="proposal" aria-live="polite"><h3>What this workflow helps with</h3><ul><li>Remember the details that matter.</li><li>Use your approved pricing and scope.</li><li>Carry the agreement into onboarding and delivery.</li></ul></div></section></div>`;
}
function prepare() {
  const approved = document.querySelector("#approver").checked,
    followup = document.querySelector("#followup").checked;
  document.querySelector("#proposal").innerHTML =
    `<div class="notice ${approved ? "" : "warning"}" style="margin-top:24px">${approved ? "Approver confirmed. Draft remains subject to your review." : "Open question: confirm who can approve the scope before sending."}</div><h3>Draft proposal · Client handoff workshop</h3><p>A half-day workshop for six staff members, followed by a written process guide.${followup ? " Includes one follow-up session." : ""} Target delivery next month; exact dates to be agreed.</p><h3>Scope and fee</h3><div class="table-scroll"><table><thead><tr><th>Deliverable</th><th>Hours</th><th>Fee</th></tr></thead><tbody><tr><td>Discovery & preparation</td><td>2</td><td>$350</td></tr><tr><td>Workshop preparation & facilitation</td><td>6</td><td>$1,050</td></tr><tr><td>Written process guide</td><td>4</td><td>$700</td></tr>${followup ? "<tr><td>Follow-up session</td><td>2</td><td>$350</td></tr>" : ""}<tr><th>Total draft fee</th><th>${followup ? 14 : 12}</th><th>${money(proposalFee(followup))}</th></tr></tbody></table></div><p class="fine">Calculated at $175/hour from the ${cite("rates", "sample rate card")}. Illustrative consultant pricing, not First Charter AI fees. Excludes travel and taxes.</p><p><strong>Out of scope:</strong> software implementation, additional workshops, and ongoing operations. Changes require a revised agreement.</p><div class="next-grid"><div><h3>Onboarding checklist</h3><ol><li>${approved ? "Record the operations director as approver." : "Confirm the authorized approver."}</li><li>Agree dates, payment terms, and scope.</li><li>Collect two anonymized handoff examples.</li><li>Confirm attendees and workshop location.</li></ol></div><div><h3>First deliverable · Draft agenda</h3><ol><li>Map the current client handoff.</li><li>Identify missing information and ownership.</li><li>Practice the revised handoff checklist.</li><li>Agree owners and next steps.</li></ol></div></div><p class="fine">Prepared from ${cite("notes", "discovery notes")}. Nothing has been sent or committed.</p>`;
}
function beacon() {
  return `<div class="workspace"><aside class="inputs"><h2>Your context</h2><p>A personal assistant brings a busy week into focus.</p>${sourceButton("calendar")}${sourceButton("correspondence")}${sourceButton("preferences")}<div class="controls"><p>Review the brief, inspect its sources, and try a suggested action.</p><button id="reset-week" class="source">Reset sample week</button></div></aside><section class="output"><h2>Your weekly brief</h2><div id="calendar-notice" class="notice warning"><strong>Tuesday has a conflict.</strong> Your accountant call and installer visit both start at 10:00. The installer offered Thursday at 14:00. ${cite("calendar", "View calendar")}</div><button id="move-visit" class="btn">Try moving the visit to Thursday</button><p class="status" id="calendar-status" role="status"></p><h3>Home project · Ask before approving</h3><p>The quote lists $2,400 for materials, but labor and disposal remain unpriced. Ask for the full total before approving. ${cite("correspondence", "View email")} · ${cite("preferences", "Your preferences")}</p><div class="draft"><h3>Draft reply</h3><p>Thanks for the quote. Could you confirm the labor and disposal costs, and the total including any applicable taxes? I’ll review the complete cost before approving.</p><button class="btn" id="approve-draft">Mark draft ready for review</button><p class="status" id="draft-status" role="status"></p></div><h3>By Friday · Travel preferences</h3><p>Send your adviser a preferred departure window. Your saved preference is to avoid early mornings when practical. ${cite("correspondence", "Email")} · ${cite("preferences", "Preference")}</p></section></div>`;
}
function manifest() {
  return `<div class="workspace"><aside class="inputs"><h2>Business records</h2><p>Why did a profitable month leave less cash in the bank?</p>${sourceButton("actuals")}${sourceButton("invoices")}${sourceButton("assumptions")}<div class="controls"><label>Equipment purchase: <output id="equipment-value">$0</output><input aria-label="Equipment purchase" id="equipment" type="range" min="0" max="20000" step="1000" value="0"></label><label>Extra monthly staff cost: <output id="hire-value">$0</output><input aria-label="Extra monthly staff cost" id="hire" type="range" min="0" max="10000" step="500" value="0"></label><label>Collect overdue invoices in<select id="collection"><option value="1">Month 1</option><option value="2">Month 2</option><option value="3">Month 3</option></select></label><button class="source" id="reset-finances">Reset assumptions</button></div></aside><section class="output"><h2>Profit and cash tell different stories.</h2><div class="metrics">${metric("Last month’s profit", "$15,000")}${metric("Change in bank balance", "−$5,000")}${metric("Uncollected invoices", "$20,000")}</div><h3>What happened?</h3><p>The business earned $60,000 but collected only $40,000. With $45,000 paid out, cash fell by $5,000. The uncollected $20,000 explains the difference between profit and cash in this simplified example. ${cite("actuals", "Inspect figures")} · ${cite("invoices", "Inspect invoices")}</p><h3>Compare a three-month cash plan</h3><p>Adjust an equipment purchase, staff cost, and collection timing. All figures below are calculated directly from the ${cite("assumptions", "planning assumptions")}.</p><div id="forecast" aria-live="polite"></div><p class="fine">Fictional illustration. This simplified model excludes taxes and other material cash flows; it is not financial advice.</p></section></div>`;
}
function updateForecast() {
  const equipment = Number(document.querySelector("#equipment").value),
    hire = Number(document.querySelector("#hire").value),
    collectionMonth = Number(document.querySelector("#collection").value);
  document.querySelector("#equipment-value").textContent = money(equipment);
  document.querySelector("#hire-value").textContent = money(hire);
  const rows = forecast({ equipment, hire, collectionMonth });
  const fields = [
    ["Opening cash", "opening"],
    ["New work collections", 50000],
    ["Existing cash costs", -45000],
    ["Old invoices collected", "collections"],
    ["Equipment payment", "purchase"],
    ["Additional staff cost", "hire"],
    ["Closing cash", "closing"],
  ];
  document.querySelector("#forecast").innerHTML =
    `<div class="table-scroll"><table><thead><tr><th>Cash movement</th>${rows.map((r) => `<th>Month ${r.month}</th>`).join("")}</tr></thead><tbody>${fields.map(([label, key]) => `<tr><${key === "closing" ? "th" : "td"}>${label}</${key === "closing" ? "th" : "td"}>${rows.map((r) => `<td>${money(typeof key === "number" ? key : ["purchase", "hire"].includes(key) ? -r[key] : r[key])}</td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="notice ${rows.some((r) => r.closing < 0) ? "warning" : ""}">${rows.some((r) => r.closing < 0) ? "This plan runs below zero cash. Review costs, timing, and funding before making commitments." : `Lowest projected month-end balance: ${money(Math.min(...rows.map((r) => r.closing)))}. Check within-month payment timing before committing.`}</div>`;
}
function init() {
  const type = document.body.dataset.demo;
  const app = document.querySelector("#demo-app");
  if (!app) return;
  app.innerHTML = { helm, beacon, manifest }[type]();
  const dialog = document.createElement("dialog");
  dialog.setAttribute("aria-labelledby", "source-title");
  dialog.innerHTML =
    '<button class="close">Close</button><h2 id="source-title"></h2><pre></pre>';
  document.body.append(dialog);
  dialog.querySelector(".close").onclick = () => dialog.close();
  app.addEventListener("click", (e) => {
    const button = e.target.closest("[data-source]");
    if (!button) return;
    const [title, text] = sources[button.dataset.source];
    dialog.querySelector("h2").textContent = title;
    dialog.querySelector("pre").textContent = text;
    dialog.showModal();
  });
  if (type === "helm") {
    document.querySelector("#prepare").onclick = prepare;
    for (const el of document.querySelectorAll(".controls input"))
      el.onchange = () => {
        if (
          document.querySelector("#proposal h3")?.textContent !==
          "What this workflow helps with"
        )
          document.querySelector("#proposal").innerHTML =
            '<div class="notice" style="margin-top:24px">Inputs changed. Prepare a new proposal to update the draft.</div>';
      };
  }
  if (type === "beacon") {
    document.querySelector("#move-visit").onclick = (e) => {
      document.querySelector("#calendar-notice").className = "notice";
      document.querySelector("#calendar-notice").textContent =
        "Sample plan: accountant Tuesday at 10:00; installer Thursday at 14:00. The conflict is resolved in this demo.";
      document.querySelector("#calendar-status").textContent =
        "Proposed change only. A real assistant would request approval before changing your calendar.";
      e.target.disabled = true;
    };
    document.querySelector("#approve-draft").onclick = () =>
      (document.querySelector("#draft-status").textContent =
        "Marked ready in this demo. No email has been sent.");
    document.querySelector("#reset-week").onclick = () => {
      document.querySelector("#calendar-notice").className = "notice warning";
      document.querySelector("#calendar-notice").innerHTML =
        "<strong>Tuesday has a conflict.</strong> Your accountant call and installer visit both start at 10:00. The installer offered Thursday at 14:00. " +
        cite("calendar", "View calendar");
      document.querySelector("#move-visit").disabled = false;
      document.querySelector("#calendar-status").textContent = "";
      document.querySelector("#draft-status").textContent = "";
    };
  }
  if (type === "manifest") {
    for (const el of document.querySelectorAll(
      ".controls input,.controls select",
    ))
      el.addEventListener("input", updateForecast);
    document.querySelector("#reset-finances").onclick = () => {
      document.querySelector("#equipment").value = 0;
      document.querySelector("#hire").value = 0;
      document.querySelector("#collection").value = 1;
      updateForecast();
    };
    updateForecast();
  }
}
if (typeof document !== "undefined") init();
