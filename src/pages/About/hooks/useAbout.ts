import { useGetAbout } from "@/utils/api/hooks/useGetAbout";
import { useMemo, useState } from "react";
import type { EditAboutSchema } from "../components/EditAboutDialog/constants/EditAboutShema";
import {useAuth} from "@/utils/contexts/auth";

export const useAbout = () => {
    const abouts = useGetAbout();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editAbout, setEditAbout] = useState<About>();
    const { authenticated, roles } = useAuth()
    const [aboutData, setAboutData] = useState<EditAboutSchema | undefined>(undefined);

    const openEditAbout = () => {
        setAboutData(undefined);
        setIsOpen(true);
    }

    const getAboutInfo = useMemo(() => {
        if (!abouts.data) return undefined

        return abouts.data.data;
    }, [abouts.data]);

    return {
        state: { isOpen, editAbout, roles, authenticated, abouts, getAboutInfo, aboutData },
        functions: {
            setIsOpen,
            setEditAbout,
            openEditAbout
        }
    }
}