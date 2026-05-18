"""Generate the one-page SAP case study exec summary PDF.

Produces public/artifacts/sap-case-study-summary.pdf for the forward-it-to-your-CHRO use case.
Run from project root: python3 scripts/generate-sap-summary.py
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

OUT_PATH = Path(__file__).resolve().parent.parent / "public" / "artifacts" / "sap-case-study-summary.pdf"

# Brand palette aligned to hau.ge globals.css
FG = HexColor("#0a0a0a")
MUTED = HexColor("#6b7280")
BORDER = HexColor("#e5e7eb")
SUBTLE = HexColor("#f5f5f5")

PAGE_W, PAGE_H = A4
MARGIN = 1.8 * cm


def draw_paragraph(c, text, x, y, w, style, leading=None):
    p = Paragraph(text, style)
    _, used_h = p.wrap(w, 9999)
    p.drawOn(c, x, y - used_h)
    return y - used_h


def main():
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT_PATH), pagesize=A4)
    c.setTitle("SAP Learning Days — Case Study Summary")
    c.setAuthor("Michael L. Hauge")
    c.setSubject("Multi-site executive training program for SAP China, 2019–2020")

    inner_w = PAGE_W - 2 * MARGIN

    body_style = ParagraphStyle(
        "body",
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        textColor=FG,
        alignment=TA_LEFT,
    )
    muted_small = ParagraphStyle(
        "muted_small",
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=MUTED,
    )
    quote_style = ParagraphStyle(
        "quote",
        fontName="Helvetica-Oblique",
        fontSize=10.5,
        leading=15,
        textColor=FG,
        leftIndent=10,
    )

    y = PAGE_H - MARGIN

    # ── Header strip ────────────────────────────────────────────────────────────
    c.setFont("Helvetica", 8)
    c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "CASE STUDY · MICHAEL L. HAUGE · HAU.GE")
    c.drawRightString(PAGE_W - MARGIN, y, "Forward to your team")
    y -= 6
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(MARGIN, y, PAGE_W - MARGIN, y)
    y -= 18

    # ── Title ───────────────────────────────────────────────────────────────────
    c.setFillColor(FG)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(MARGIN, y, "SAP Learning Days, China")
    y -= 22
    c.setFont("Helvetica", 11)
    c.setFillColor(MUTED)
    c.drawString(MARGIN, y, "13-month executive training program · 2019–2020 · published with SAP's permission")
    y -= 24

    # ── Hero stats row ──────────────────────────────────────────────────────────
    stats = [
        ("94", "NPS"),
        ("167", "Participants"),
        ("5", "Cities in China"),
        ("12", "Learning Days"),
        ("13", "Months"),
    ]
    col_w = inner_w / len(stats)
    stat_top = y
    stat_h = 50
    # Draw subtle background block
    c.setFillColor(SUBTLE)
    c.rect(MARGIN, stat_top - stat_h, inner_w, stat_h, fill=1, stroke=0)
    for i, (value, label) in enumerate(stats):
        cx = MARGIN + col_w * i + col_w / 2
        c.setFillColor(FG)
        c.setFont("Helvetica-Bold", 22)
        c.drawCentredString(cx, stat_top - 22, value)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        c.drawCentredString(cx, stat_top - 38, label.upper())
    y = stat_top - stat_h - 20

    # ── Engagement summary ──────────────────────────────────────────────────────
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(MARGIN, y, "THE ENGAGEMENT")
    y -= 12
    summary = (
        "SAP's China organisation wanted a consistent executive learning experience for "
        "high-potential staff across five offices. I designed and delivered a single "
        "curriculum that travelled — twelve Learning Days in Shanghai, Beijing, Dalian, "
        "Chengdu, and Xi'An, run consecutively across 13 months, 10–19 participants per "
        "cohort. Each day was followed by a retrospective with site leadership; findings "
        "were folded into the next iteration."
    )
    y = draw_paragraph(c, summary, MARGIN, y, inner_w, body_style)
    y -= 16

    # ── Outcomes / Survey results ───────────────────────────────────────────────
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(MARGIN, y, "POST-PROGRAM SURVEY (n=52)")
    y -= 12
    bullets = [
        "<b>100%</b> said the content was relevant to their work",
        "<b>100%</b> said the day was worth their time",
        "<b>98%</b> learned skills they could apply the next day",
        "<b>NPS of 94</b> when asked to recommend the trainer to a colleague",
    ]
    for b in bullets:
        y = draw_paragraph(c, "•&nbsp;&nbsp;" + b, MARGIN, y, inner_w, body_style)
        y -= 2
    y -= 14

    # ── Quotes ──────────────────────────────────────────────────────────────────
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(MARGIN, y, "WHAT PARTICIPANTS SAID")
    y -= 14
    quotes = [
        "&ldquo;Best training in my time at SAP.&rdquo;",
        "&ldquo;Most engaging training I&rsquo;ve ever attended.&rdquo;",
        "&ldquo;Coach Mike was really professional and funny at the same time.&rdquo;",
    ]
    # Vertical bar accent left of each quote
    for q in quotes:
        bar_x = MARGIN
        # Wrap to compute height
        temp = Paragraph(q, quote_style)
        _, qh = temp.wrap(inner_w - 14, 9999)
        c.setStrokeColor(FG)
        c.setLineWidth(1.5)
        c.line(bar_x, y, bar_x, y - qh)
        temp.drawOn(c, MARGIN + 12, y - qh)
        y -= qh + 8

    y -= 16

    # ── Footer / Trainer block ──────────────────────────────────────────────────
    # Push footer to bottom of usable area
    footer_top = MARGIN + 60
    if y < footer_top:
        # If content overran, this still draws at MARGIN+60 — won't overlap as long as we stayed in budget
        pass
    y = footer_top
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(MARGIN, y, PAGE_W - MARGIN, y)
    y -= 14

    c.setFillColor(FG)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(MARGIN, y, "Michael L. Hauge")
    c.setFont("Helvetica", 9)
    c.setFillColor(MUTED)
    c.drawRightString(PAGE_W - MARGIN, y, "hau.ge")
    y -= 12

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(
        MARGIN,
        y,
        "AI training, implementation, and financial backing for ambitious companies in Southeast Asia.",
    )
    y -= 14

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(MARGIN, y, "michael@pertamapartners.com  ·  linkedin.com/in/michaelhauge  ·  Pertama Group, Kuala Lumpur")

    c.showPage()
    c.save()
    print(f"Wrote {OUT_PATH} ({OUT_PATH.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
