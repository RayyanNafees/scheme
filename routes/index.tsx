import courses from "../data/courses.json" with { type: "json" };
import getInfoFromCard from "../utils/student.ts";
import { Scheme } from "../components/scheme.tsx";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";

interface Data {
  enroll: `${string}${number}`;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render({ enroll: cookies.enroll });
  },
};

export default async function Page(props: PageProps<Data>) {
  const url = new URL(props.url);

  console.log(props);

  const enroll = url.searchParams.get("enroll") ?? props.data?.enroll ?? "";

  if (!enroll) return <Scheme enroll={enroll} myScheme={[]} />;

  if (!props.data?.enroll) {
    const headers = new Headers();
    setCookie(headers, {
      name: "enroll",
      value: enroll, // this should be a unique value for each session
      maxAge: 120,
      sameSite: "Lax", // this is important to prevent CSRF attacks
      domain: url.hostname,
      path: "/",
      secure: true,
    });
  }

  const studentInfo = await getInfoFromCard(enroll.toUpperCase());

  const subjectIds = studentInfo.subjects.map((i) => i.code);

  const myScheme = courses
    .filter((c) => subjectIds.includes(c.id))
    .toSorted((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));

  return <Scheme enroll={enroll} myScheme={myScheme} />;
}
