"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Image from "next/image";
import { ChatComponent } from "@/Components/ChatComponent";
import Modal from "react-modal";

export default function Chat() {
  const [chat, SetChat] = useState<string>("");
  const [chatReq, SetChatReq] = useState<string[]>([]);
  const [chatResp, SetChatResp] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState<string>("");
  const [isModalvisible, setIsModalVisible] = useState<boolean>(false);
  const [apiKeyErrorText, setApiKeyErrorText] = useState("");
  const user = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const apiKeyValue = localStorage.getItem("apiKey");
      if (apiKeyValue) {
        setIsModalVisible(false);
        setApiKey(apiKeyValue);
      } else {
        setIsModalVisible(true);
      }
    }
  }, []);

  const communicateWithGpt = async () => {
    if (chat) {
      SetChatReq([...chatReq, chat]);
      const configuration = new Configuration({
        apiKey: apiKey,
        organization: "org-LWo5ctCrKDx4byN7EKUpVNit",
      });
      SetChat("");
      const openai = new OpenAIApi(configuration);
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: chat }],
      });
      if (response.data.choices[0].message?.content)
        SetChatResp([...chatResp, response.data.choices[0].message?.content]);
      else {
        SetChatResp([
          ...chatResp,
          "Unexpected error has occurred please try again",
        ]);
      }
    }
  };

  React.useEffect(() => {
    if (!user.loggedIn) router.push("/signin");
  }, [router, user]);

  const modalComponent = (
    <Modal ariaHideApp={false} isOpen={isModalvisible}>
      <div
        className="flex flex-col justify-center items-center"
        style={{ minHeight: "80vh" }}
      >
        <h1 className="mb-2">Please enter the API key</h1>
        <input
          style={{
            border: "1px solid black",
            borderRadius: 5,
            padding: 7,
          }}
          type="text"
          onChange={(e) => {
            if (e.target.value?.length != 51) {
              setApiKeyErrorText("API Key should be of 51 characters");
            } else {
              setApiKeyErrorText("");
            }
            setApiKey(e.target.value);
          }}
        ></input>
        <p>{apiKeyErrorText}</p>
        <button
          style={{ width: 100, alignSelf: "center" }}
          className="border-black border-solid text-white bg-black p-2 rounded flex justify-center mt-2"
          onClick={() => {
            if (apiKey.length) {
              localStorage.setItem("apiKey", apiKey);
              setIsModalVisible(false);
            } else {
              setApiKeyErrorText("Api key cannot be null");
            }
          }}
        >
          Save Key
        </button>
      </div>
    </Modal>
  );

  return (
    <>
      <main
        style={{ minHeight: "90vh" }}
        className="flex flex-col items-center justify-between lg-p-24"
      >
        <div className="flex flex-col items-center w-full">
          {chatReq?.map((chatdata, index) => (
            <ChatComponent
              chat={chatdata}
              chatResp={chatResp ? chatResp[index] : ""}
              key={index}
            ></ChatComponent>
          ))}
        </div>
        <div
          className="w-full  flex align-center justify-center p-4 bg-white"
          style={{
            width: "75%",
            bottom: 3,
            position: "relative",
            border: "1px solid black",
            borderRadius: 10,
          }}
        >
          <input
            value={chat}
            type="text"
            className="w-full"
            placeholder="Send a message"
            onChange={(e) => SetChat(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                communicateWithGpt();
              }
            }}
          ></input>
          <div style={{ alignItems: "self-end", display: "flex" }}>
            <Image
              src={"/send.png"}
              height={30}
              width={30}
              alt={""}
              onClick={() => communicateWithGpt()}
            ></Image>
          </div>
        </div>
        {modalComponent}
      </main>
    </>
  );
}
