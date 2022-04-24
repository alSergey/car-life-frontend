// import { api } from "../../../../api";
// import { backBaseUrl } from "../../../../constants/url";
import { EventPostData } from "../CreateEventPost";

// export const createNewEventPost = (form: EventPostData): Promise<number> => {
// 	if (!form.text && !form.files) throw new Error("Не заполнены все поля");
//
// 	return api.event
// 		.createCreatePost({
// 			userId: form.userId,
// 			text: form.name,
// 			photos: "",
// 		})
// 		.then(({ data }) => {
// 			if (!form.files) return data.id;
//
// 			const formData = new FormData();
// 			formData.append("file-upload", form.files);
//
// 			return fetch(`${backBaseUrl}/events/${data.id}/upload`, {
// 				method: "POST",
// 				body: formData,
// 			}).then(() => data.id);
// 		});
// };

export const createNewEventPost = (form: EventPostData) => {
	console.log(form);
	return true;
};
