import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

interface RevalidateBody {
  path?: string;
}

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET not configured" },
      { status: 500 },
    );
  }

  const provided = request.headers.get("x-revalidate-secret");
  if (provided !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: RevalidateBody;
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { path } = body;
  if (!path) {
    return NextResponse.json(
      { ok: false, error: "Provide 'path' in body" },
      { status: 400 },
    );
  }

  revalidatePath(path);

  return NextResponse.json({
    ok: true,
    revalidated: { path },
    timestamp: new Date().toISOString(),
  });
}
