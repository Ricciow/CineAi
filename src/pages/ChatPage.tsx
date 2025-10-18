import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom"
import ProjetoTitle from "../components/projetos/ProjetoTitle";
import Dropdown from "../components/Dropdown/Dropdown";
import Propmter from "../components/chat/Prompter";

import geminiLogo from "../assets/gemini.svg";
import gptLogo from "../assets/openai.svg";
import claudeLogo from "../assets/claude.svg";
import UserMessage from "../components/chat/UserMessage";
import AgentMessage from "../components/chat/AgentMessage";

const options = [{ name: "Gemini 2.5 pro", icon: geminiLogo, image: true, value: 1}, { name: "Gpt 5", icon: gptLogo, image: true, value: 1}, { name: "Claude 4.5 Sonnet", icon: claudeLogo, image: true, value: 1}]

const conversa = [
  {
    role: "user",
    message:"blabla"
  },
  {
    role:"agent",
    message:"B"
  },
  {
    role: "user",
    message:"blabla2"
  },
  {
    role:"agent",
    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur enim justo, ultricies sit amet luctus vitae, malesuada sit amet lectus. Integer aliquet bibendum sem, et porta lacus efficitur ac. Curabitur quis ante mi. Maecenas posuere dolor ut leo eleifend aliquam vel sit amet nulla. Nunc volutpat venenatis nisi, id viverra ligula condimentum id. Pellentesque consequat dignissim sagittis. Mauris eu odio a ex congue bibendum in ac magna. Donec quis risus congue, hendrerit urna vehicula, tincidunt elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam auctor congue rhoncus. Nam aliquet ex a nisl condimentum facilisis. Mauris a pretium lectus. Aliquam ut mi in tellus porttitor laoreet. Pellentesque at fermentum purus, vitae sollicitudin erat. Donec gravida dignissim porta. Suspendisse sollicitudin leo eu velit euismod, a lacinia ex euismod. Nullam tempor mi at feugiat egestas. Cras quis pretium est. Aliquam facilisis dui non blandit scelerisque."
  },
  {
    role:"agent",
    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur enim justo, ultricies sit amet luctus vitae, malesuada sit amet lectus. Integer aliquet bibendum sem, et porta lacus efficitur ac. Curabitur quis ante mi. Maecenas posuere dolor ut leo eleifend aliquam vel sit amet nulla. Nunc volutpat venenatis nisi, id viverra ligula condimentum id. Pellentesque consequat dignissim sagittis. Mauris eu odio a ex congue bibendum in ac magna. Donec quis risus congue, hendrerit urna vehicula, tincidunt elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam auctor congue rhoncus. Nam aliquet ex a nisl condimentum facilisis. Mauris a pretium lectus. Aliquam ut mi in tellus porttitor laoreet. Pellentesque at fermentum purus, vitae sollicitudin erat. Donec gravida dignissim porta. Suspendisse sollicitudin leo eu velit euismod, a lacinia ex euismod. Nullam tempor mi at feugiat egestas. Cras quis pretium est. Aliquam facilisis dui non blandit scelerisque."
  },
  {
    role:"agent",
    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur enim justo, ultricies sit amet luctus vitae, malesuada sit amet lectus. Integer aliquet bibendum sem, et porta lacus efficitur ac. Curabitur quis ante mi. Maecenas posuere dolor ut leo eleifend aliquam vel sit amet nulla. Nunc volutpat venenatis nisi, id viverra ligula condimentum id. Pellentesque consequat dignissim sagittis. Mauris eu odio a ex congue bibendum in ac magna. Donec quis risus congue, hendrerit urna vehicula, tincidunt elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam auctor congue rhoncus. Nam aliquet ex a nisl condimentum facilisis. Mauris a pretium lectus. Aliquam ut mi in tellus porttitor laoreet. Pellentesque at fermentum purus, vitae sollicitudin erat. Donec gravida dignissim porta. Suspendisse sollicitudin leo eu velit euismod, a lacinia ex euismod. Nullam tempor mi at feugiat egestas. Cras quis pretium est. Aliquam facilisis dui non blandit scelerisque."
  },
  {
    role:"agent",
    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur enim justo, ultricies sit amet luctus vitae, malesuada sit amet lectus. Integer aliquet bibendum sem, et porta lacus efficitur ac. Curabitur quis ante mi. Maecenas posuere dolor ut leo eleifend aliquam vel sit amet nulla. Nunc volutpat venenatis nisi, id viverra ligula condimentum id. Pellentesque consequat dignissim sagittis. Mauris eu odio a ex congue bibendum in ac magna. Donec quis risus congue, hendrerit urna vehicula, tincidunt elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam auctor congue rhoncus. Nam aliquet ex a nisl condimentum facilisis. Mauris a pretium lectus. Aliquam ut mi in tellus porttitor laoreet. Pellentesque at fermentum purus, vitae sollicitudin erat. Donec gravida dignissim porta. Suspendisse sollicitudin leo eu velit euismod, a lacinia ex euismod. Nullam tempor mi at feugiat egestas. Cras quis pretium est. Aliquam facilisis dui non blandit scelerisque."
  },
  {
    role:"agent",
    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur enim justo, ultricies sit amet luctus vitae, malesuada sit amet lectus. Integer aliquet bibendum sem, et porta lacus efficitur ac. Curabitur quis ante mi. Maecenas posuere dolor ut leo eleifend aliquam vel sit amet nulla. Nunc volutpat venenatis nisi, id viverra ligula condimentum id. Pellentesque consequat dignissim sagittis. Mauris eu odio a ex congue bibendum in ac magna. Donec quis risus congue, hendrerit urna vehicula, tincidunt elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam auctor congue rhoncus. Nam aliquet ex a nisl condimentum facilisis. Mauris a pretium lectus. Aliquam ut mi in tellus porttitor laoreet. Pellentesque at fermentum purus, vitae sollicitudin erat. Donec gravida dignissim porta. Suspendisse sollicitudin leo eu velit euismod, a lacinia ex euismod. Nullam tempor mi at feugiat egestas. Cras quis pretium est. Aliquam facilisis dui non blandit scelerisque."
  },
  {
    role:"agent",
    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur enim justo, ultricies sit amet luctus vitae, malesuada sit amet lectus. Integer aliquet bibendum sem, et porta lacus efficitur ac. Curabitur quis ante mi. Maecenas posuere dolor ut leo eleifend aliquam vel sit amet nulla. Nunc volutpat venenatis nisi, id viverra ligula condimentum id. Pellentesque consequat dignissim sagittis. Mauris eu odio a ex congue bibendum in ac magna. Donec quis risus congue, hendrerit urna vehicula, tincidunt elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam auctor congue rhoncus. Nam aliquet ex a nisl condimentum facilisis. Mauris a pretium lectus. Aliquam ut mi in tellus porttitor laoreet. Pellentesque at fermentum purus, vitae sollicitudin erat. Donec gravida dignissim porta. Suspendisse sollicitudin leo eu velit euismod, a lacinia ex euismod. Nullam tempor mi at feugiat egestas. Cras quis pretium est. Aliquam facilisis dui non blandit scelerisque."
  }
]

export function chatPageLoader({ params }: LoaderFunctionArgs) {
    return {
        id: params.id
    }
}

export default function ChatPage() {
    const { id } = useLoaderData();
    const chatName = `Chat ${id}`
    const chatDescription = `Descrição do chat ${id}`

    return (
        <div className="chat_main">
            <div className="chat_header">
                <ProjetoTitle title={chatName} description={chatDescription} />
                <Dropdown title="Modelos" options={options} onSelect={() => {}} titleByOption/>
            </div>
            <div className="chat_content">
                {conversa.map((message, index) => message.role === "user" ? <UserMessage key={index} message={message.message} /> : <AgentMessage key={index} message={message.message} />)}
            </div>
            <div className="chat_footer">
                <Propmter />
            </div>
        </div>
    )
}