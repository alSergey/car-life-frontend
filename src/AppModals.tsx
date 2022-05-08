import React from "react";
import { ModalRoot, SplitLayout } from "@vkontakte/vkui";
import { useRouter, useLocation } from "@happysanta/router";
import {
	CREATE_EVENT_POST_MODAL,
	CREATE_EVENT_POST_COMPLAIN_MODAL,
	CREATE_CLUB_COMPLAIN_MODAL,
	CREATE_EVENT_COMPLAIN_MODAL,
	CREATE_USER_COMPLAIN_MODAL,
	CREATE_CAR_COMPLAIN_MODAL,
} from "./router";
import { CreateEventPostModal } from "./modals/CreateEventPostModal";
import { CreateEventPostComplainModal } from "./modals/CreateEventPostComplainModal";
import { CreateClubComplainModal } from "./modals/CreateClubComplainModal";
import { CreateEventComplainModal } from "./modals/CreateEventComplainModal";
import { CreateUserComplainModal } from "./modals/CreateUserComplainModal";
import { CreateCarComplainModal } from "./modals/CreateCarComplainModal";
import { App } from "./App";

export const AppModals: React.FC = () => {
	const router = useRouter();
	const location = useLocation();

	return (
		<SplitLayout
			modal={
				<ModalRoot activeModal={location.getModalId()}>
					<CreateEventPostModal
						id={CREATE_EVENT_POST_MODAL}
						onClose={() => router.popPage()}
					/>
					<CreateEventPostComplainModal
						id={CREATE_EVENT_POST_COMPLAIN_MODAL}
						onClose={() => router.popPage()}
					/>
					<CreateClubComplainModal
						id={CREATE_CLUB_COMPLAIN_MODAL}
						onClose={() => router.popPage()}
					/>
					<CreateEventComplainModal
						id={CREATE_EVENT_COMPLAIN_MODAL}
						onClose={() => router.popPage()}
					/>
					<CreateUserComplainModal
						id={CREATE_USER_COMPLAIN_MODAL}
						onClose={() => router.popPage()}
					/>
					<CreateCarComplainModal
						id={CREATE_CAR_COMPLAIN_MODAL}
						onClose={() => router.popPage()}
					/>
				</ModalRoot>
			}
		>
			<App />
		</SplitLayout>
	);
};
