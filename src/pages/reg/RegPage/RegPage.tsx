import React from "react";
import {
	Button,
	FixedLayout,
	FormItem,
	FormLayout,
	Panel,
	PanelHeader,
} from "@vkontakte/vkui";
import { TagWidget } from "../../../widgets/TagWidget";
import { RegForm } from "../../../tabs/RegView/api";

interface Props {
	id: string;
	form: RegForm;
	onFormChange: (form: RegForm) => void;
	onCarClick: () => void;
}

export const RegPage: React.FC<Props> = ({
	id,
	form,
	onCarClick,
	onFormChange,
}) => {
	return (
		<Panel id={id}>
			<PanelHeader>Регистрация</PanelHeader>
			<FormLayout>
				<FormItem top="Выберите интересы">
					<TagWidget
						values={form.tags}
						onChange={(tags) => {
							onFormChange({
								...form,
								tags,
							});
						}}
					/>
				</FormItem>
				<FormItem>
					<Button
						stretched
						size="l"
						disabled={Boolean(form.car)}
						onClick={onCarClick}
					>
						Добавить автомобиль
					</Button>
				</FormItem>
				<FixedLayout vertical="bottom">
					<FormItem>
						<Button stretched size="l" onClick={onCarClick}>
							Регистрация
						</Button>
					</FormItem>
				</FixedLayout>
			</FormLayout>
		</Panel>
	);
};
