import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParsedHTML from "@/components/shared/ParsedHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatNumber } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params, searchParams }) => {
  //   console.log(params.id);

  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const result = await getQuestionById({ questionId: params.id });

  //   console.log(result);

  // testing this ID 65d20aae51d1e163153f7082

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              height={22}
              width={22}
              alt="profile"
              className="rounded-full"
            />

            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>

          <div className="flex justify-end">
            <div className="flex gap-5">
              <div className="flex-center gap-2.5">
                <div className="flex-center gap-1.5">
                  <Image
                    src="/assets/icons/upvote.svg"
                    alt="upvote"
                    height={18}
                    width={18}
                    className="cursor-pointer"
                  />
                  <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                    <p className="subtle-medium text-dark400_light900">
                      {result.upvotes.length}
                    </p>
                  </div>
                </div>

                <div className="flex-center gap-1.5">
                  <Image
                    src="/assets/icons/downvote.svg"
                    alt="downvote"
                    height={18}
                    width={18}
                    className="cursor-pointer"
                  />
                  <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                    <p className="subtle-medium text-dark400_light900">
                      {result.downvotes.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </div>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${formatNumber(result.createdAt)}`}
          title="Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          value={formatNumber(result.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(result.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParsedHTML data={result.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag.id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={result.answers.length}
      />

      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default Page;
