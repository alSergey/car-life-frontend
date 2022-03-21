import { View } from "@vkontakte/vkui";
import React from "react";

interface Props {
	id: string;
}

export const MapTab: React.FC<Props> = ({ id }) => (
	<View activePanel="panel" id={id} />
);
