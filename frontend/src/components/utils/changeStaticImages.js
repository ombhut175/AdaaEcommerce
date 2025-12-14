import axios from "axios";
import {fetchStaticImages} from "../../store/features/staticImagesSlice.js";

export const submitImage = async (section ,side, file) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    try {
        const formPayload = new FormData();
        formPayload.append("image", file);
        formPayload.append("section", section);
        formPayload.append("part", side);

        const response = await axios.put(
            `${BACKEND_URL}/api/admin/uploadImages`,
            formPayload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            }
        );

        return response.status;
    } catch (error) {
        console.error(error);
    }
};