import { instance } from '../../../../instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export interface DeleteOperatorByIdParams {
    operatorId: string;
}

export type DeleteOperatorByIdConfig = RequestConfig<DeleteOperatorByIdParams>;

export const deleteOperatorById = async ({ config, params }: DeleteOperatorByIdConfig) =>
    instance.delete(`${USER_API_URL}/users/operators/${params.operatorId}`, config);