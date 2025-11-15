import { instance } from '../../../../instance';

export interface DeleteOperatorByIdParams {
    operatorId: string;
}

export type DeleteOperatorByIdConfig = RequestConfig<DeleteOperatorByIdParams>;

export const deleteOperatorById = async ({ config, params }: DeleteOperatorByIdConfig) =>
    instance.delete(`http://localhost:8910/api/users/operators/${params.operatorId}`, config);