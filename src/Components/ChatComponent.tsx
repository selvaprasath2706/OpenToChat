import Image from "next/image";

export const ChatComponent = ({
  chat,
  chatResp,
}: {
  chat: string;
  chatResp: string;
}) => {
  return (
    <div className="z-10 w-full max-w-5xl items-left justify-between font-mono text-sm lg:flex flex-col">
      <div className="bg-white">
        {chat && (
          <div
            className="flex flex-row  p-3"
            style={{ alignItems: "flex-start" }}
          >
            <Image
              src="/avatar.png"
              width={30}
              height={50}
              alt={""}
              className="mr-3"
            ></Image>
            {chat}
          </div>
        )}
      </div>

      <div>
        {chatResp ? (
          <div
            style={{ whiteSpace: "pre-line", alignItems: "flex-start" }}
            className="flex flex-row p-3"
          >
            <Image
              src="/bounteous.jpeg"
              width={30}
              height={50}
              alt={""}
              className="mr-3"
            ></Image>
            {chatResp.replace(/```([^`]+)```/g, "$1")}
          </div>
        ) : (
          <div
            style={{ whiteSpace: "pre-line", alignItems: "flex-start" }}
            className="flex flex-row p-3"
          >
            Loading
          </div>
        )}
      </div>
    </div>
  );
};
