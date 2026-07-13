# Portfolio demo mockups

The three demo pages live in `public/demos/` and are served on the live site
(linked from the homepage "Demos" section):

- `/demos/manifest.html` — Manifest, document intelligence (invoice extraction)
- `/demos/beacon.html` — Beacon, website FAQ assistant (RAG chatbot)
- `/demos/helm.html` — Helm, inquiry intake automation

All three use fictional businesses and sample data and are labeled as demos
in the UI, so they are honest to use as portfolio images.

Naming policy: every business name in the demos is invented (Fernwick,
Quillbrook, Wrenfield, Ironbell, Copperline, Greyfeather, Foxhollow, Kestrel,
Lanternbury, Gritwell) and was checked against a web search for collisions
with real companies. If you add or change a name, search it first; a demo
bearing a real company's name misrepresents them as a client.

## Screenshotting for Upwork

Open each page in a browser window at roughly 1440x900, hide bookmarks bar,
and capture the window content (Cmd+Shift+4, then Space, then click the
window; hold Cmd while clicking to omit the drop shadow). Upwork portfolio
images look best at 16:9 or wider.

```sh
open public/demos/manifest.html
open public/demos/beacon.html
open public/demos/helm.html
```

## One-paragraph business framing (paste into each Upwork portfolio item)

### Manifest — invoice & document extraction

> Small businesses lose hours every week retyping invoices, contracts, and
> paperwork into their books. Manifest is a document intelligence demo built
> for a custom cabinetry shop: it reads a morning's worth of invoices
> (PDFs, email bodies, even phone photos), extracts vendor, terms, line
> items, and totals, and verifies that the line items and tax reconcile to
> the stated total before anything is approved. Fields the model is not
> confident about, like a handwritten PO number, are flagged for a person
> instead of silently guessed. Approved documents export to CSV or push
> straight to QuickBooks. Built with LLM-based extraction plus deterministic
> validation, the same architecture I use for client document workflows.

### Beacon — website FAQ assistant (RAG)

> Most small-business chatbots fail because they make things up. Beacon is a
> retrieval-augmented FAQ assistant shown here on a fictional HVAC
> contractor's website: it answers customer questions about service area,
> pricing, and scheduling using only the company's own pages and documents,
> and it cites the source for every answer. Content is re-indexed nightly so
> answers track the site, and the widget hands off to a human whenever the
> customer asks or the answer is not in the sources. The same pattern works
> for any service business that answers the same twenty questions by phone
> every week.

### Helm — inquiry intake automation

> For a services business, the first hour after an inquiry arrives is where
> jobs are won and lost. Helm is an intake automation demo for a fictional
> design-build remodeler: it reads incoming email, website form, and
> voicemail-transcript inquiries, extracts the details that matter (project
> type, neighborhood, budget band, timeline), filters out vendor spam,
> scores fit, logs the lead to the CRM, and drafts a reply in the owner's
> own voice with real consult openings from the calendar. Nothing is sent
> without the owner's approval. The result in this scenario: every qualified
> lead answered the same morning, with a median of under three minutes from
> email to drafted reply.
