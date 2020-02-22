import React from 'react';
import DashBoard from "../DashBoard/DashBoard";
import {useQuery} from "@apollo/react-hooks";
import { useMutation } from '@apollo/react-hooks';
import { openQuery, openMutation } from '../DashBoard/schema'

export default function DashBoardContainer() {
    const {data: {menuOpen}} = useQuery(openQuery);
    const [openMutate] = useMutation(openMutation);

    const handleDrawerOpen = (open) => {
        openMutate({ variables: { menuOpen: open } });
    };

    return (
        <DashBoard open={menuOpen} handleDrawerOpen={handleDrawerOpen} />
    );
}
