import React from "react";
import { Counter, Header } from "@vkontakte/vkui";

interface Props {
	length: number;
	text: string;
	mode: "primary" | "prominent";
}

export const CounterHeader: React.FC<Props> = ({ length, text, mode }) => (
	<Header aside={Boolean(length) && <Counter mode={mode}>{length}</Counter>}>
		{text}
	</Header>
);
