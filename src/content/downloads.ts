// The old placeholder PDFs were removed. Add real PDFs in /admin > Downloads (they appear here automatically),
// or set `file` to a link below. Entries without a file show "Coming soon".
export type DownloadItem = { title: string; description: string; file?: string };


export const downloads: DownloadItem[] = [
  { title: "OIR Practice Sets", description: "Non-verbal and verbal practice papers for the OIR." },
  { title: "PPDT Pictures", description: "A bank of PPDT-style pictures to practise stories." },
  { title: "TAT Word List", description: "Word list for the 14-word TAT story framework." },
  { title: "WAT Sentences", description: "Sample sentences for the Word Association Test." },
  { title: "SRT Situations", description: "Practice situations with structured answers." },
  { title: "Lecturette Topics", description: "Topics for your daily 3-minute lecturette." },
  { title: "GTO Topics & Tips", description: "GTO task topics and tips." },
  { title: "Interview Questions", description: "Questions that commonly appear in the Personal Interview." },
];
