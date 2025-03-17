import courses from "../data/courses.json" with { type: "json" };
import getInfoFromCard from "../utils/student.ts";
import { Scheme } from "../components/scheme.tsx";
import type { PageProps } from "$fresh/server.ts";

export default async function Page(props: PageProps) {
  const url = new URL(props.url);
  const enroll = url.searchParams.get("enroll") ?? ""; 

  const studentInfo = !enroll
    ? { subjects: [] }
    : await getInfoFromCard(enroll.toUpperCase());
  const modes = ["a", "b"];
  const myScheme = !enroll ? [] : studentInfo.subjects
    .filter(
      (i) => courses.find((j) => j.id === i.code) && modes.includes(i.mode),
    )
    .map((i) => ({
      code: i.code,
      name: i.subject,
      date: courses.find((j) => j.id === i.code)?.date as string,
      time: courses.find((j) => j.id === i.code)?.time as string,
    }))
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));

  return <Scheme enroll={enroll} myScheme={myScheme} />;
}
