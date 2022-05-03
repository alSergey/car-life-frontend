import React, { useEffect, useState } from "react";
import { File as FileInput, Gallery } from "@vkontakte/vkui";
import { Icon24Camera } from "@vkontakte/icons";
import styles from "./UploadFile.module.css";

interface Props {
	multiple?: boolean;
	fileList?: File[] | null;
	onChange: (files: File[]) => void;
}

export const UploadFile: React.FC<Props> = ({
	multiple,
	fileList,
	onChange,
}) => {
	const [filesSrc, setFilesSrc] = useState<string[]>([]);

	useEffect(() => {
		if (!fileList) return;

		const currentFilesSrc: string[] = [];
		fileList.forEach((file, i) => {
			const reader = new FileReader();

			reader.onload = (e) => {
				// @ts-ignore
				currentFilesSrc.push(e.target.result);
				if (i === fileList.length - 1) setFilesSrc(currentFilesSrc);
			};

			reader.readAsDataURL(file);
		});
	}, [fileList]);

	return (
		<div>
			<FileInput
				stretched
				name="file-upload"
				mode="secondary"
				controlSize="l"
				multiple={multiple}
				before={<Icon24Camera />}
				accept=".jpeg,.jpg,.png,.webp"
				onChange={({ target: { files } }) => {
					if (!files) return;

					const currentFileList: File[] = [];
					for (let i = 0; i < files.length; i++) {
						const currentFile = files[i];
						if (!currentFile) continue;

						currentFileList.push(currentFile);
					}
					onChange(currentFileList);
				}}
			>
				Открыть галерею
			</FileInput>
			{Boolean(filesSrc.length) && (
				<Gallery
					showArrows
					className={styles.imageContainer}
					bullets={multiple && "dark"}
				>
					{filesSrc.map((src) => (
						<img key={src} className={styles.img} src={src} alt="" />
					))}
				</Gallery>
			)}
		</div>
	);
};
