import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  console.log("search key", key);
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      $or: [
        { prompt: { $regex: key.toString(), $options: "i" } },
        { tag: { $regex: key.toString(), $options: "i" } },
      ],
    }).populate("creator");
    console.log("prompts returned from DB ", prompts);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", { status: 500 });
  }
};
