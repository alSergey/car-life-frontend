import React, { useState } from "react";
import {
	Button,
	FixedLayout,
	FormItem,
	FormLayout,
	Panel,
	PanelHeader,
	PanelHeaderBack,
} from "@vkontakte/vkui";
import styles from "./FavPage.module.css";
import { TagWidget } from "../../../widgets/TagWidget";
import { emptyFavForm, FavForm, isFavFormFilled } from "./api";

interface Props {
	id: string;
	onFormSubmit: (form: FavForm) => void;
	onBackClick: () => void;
	onNextClick: () => void;
}

export const FavPage: React.FC<Props> = ({
	id,
	onBackClick,
	onNextClick,
	onFormSubmit,
}) => {
	const [favForm, setFavForm] = useState(emptyFavForm);

	return (
		<Panel id={id}>
			<PanelHeader
				left={
					<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
				}
			>
				Интересы
			</PanelHeader>
			<FormLayout
				onSubmit={(e) => {
					e.preventDefault();
					onFormSubmit(favForm);
					onNextClick();
				}}
			>
				<FormItem top="Выберите интересы">
					<TagWidget
						values={favForm.tags}
						onChange={(tags) => {
							setFavForm({
								tags,
							});
						}}
					/>
				</FormItem>
				<FixedLayout vertical="bottom">
					<FormItem>
						<Button
							stretched
							size="l"
							type="submit"
							disabled={!isFavFormFilled(favForm)}
						>
							Дальше
						</Button>
					</FormItem>
				</FixedLayout>
			</FormLayout>
		</Panel>
	);
};
