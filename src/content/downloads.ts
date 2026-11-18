// Files are currently hosted on the existing ssbmadesimple.com site.
// Later, copy the PDFs into /public/downloads and change `file` to "/downloads/<name>.pdf".
export type DownloadItem = { title: string; description: string; file?: string };

const base = "https://ssbmadesimple.com/downloads";

export const downloads: DownloadItem[] = [
  { title: "OIR Practice Sets", description: "Non-verbal and verbal practice papers for the OIR." },
  { title: "PPDT Pictures", description: "A bank of PPDT-style pictures to practise stories.", file: `${base}/ppdt-picture-bank.pdf` },
  { title: "TAT Word List", description: "Word list for the 14-word TAT story framework.", file: `${base}/tat-word-list.pdf` },
  { title: "WAT Sentences", description: "Sample sentences for the Word Association Test.", file: `${base}/wat-sentences.pdf` },
  { title: "SRT Situations", description: "Practice situations with structured answers.", file: `${base}/srt-situations.pdf` },
  { title: "Lecturette Topics", description: "Topics for your daily 3-minute lecturette.", file: `${base}/lecturette-topics.pdf` },
  { title: "GTO Topics & Tips", description: "GTO task topics and tips.", file: `${base}/gto-topics-tips.pdf` },
  { title: "Interview Questions", description: "Questions that commonly appear in the Personal Interview.", file: `${base}/interview-questions.pdf` },
];
