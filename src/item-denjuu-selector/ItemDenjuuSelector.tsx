import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { itemList } from '../data/items';
import { itemThunk } from '../playerDenjuu';
import { RootState } from '../store';

interface SelectionOptions {
    denjuuInstanceId?: string;
    itemId?: number;
}

interface Props extends SelectionOptions {
    selectionCallback: () => void;
}
export const ItemDenjuuSelector = ({
    denjuuInstanceId,
    itemId,
    selectionCallback,
}: Props) => {
    const { items } = useSelector(({ inventory }: RootState) => inventory);
    const dispatch = useDispatch();
    const [selections, setSelection] = useState<SelectionOptions>({
        denjuuInstanceId,
        itemId,
    });
    console.log(selections);
    return (
        <div>
            {!denjuuInstanceId && <div>denjuu picker goes here</div>}
            {!itemId && (
                <ItemSelectorMenu>
                    Select Item
                    <br />
                    <select
                        defaultValue={selections.itemId}
                        onChange={(changeEvent) => {
                            setSelection({
                                ...selections,
                                itemId: parseInt(changeEvent.target.value),
                            });
                        }}
                    >
                        <option value={undefined} hidden>
                            select one
                        </option>
                        {items.map((entry) => (
                            <option value={entry.itemId} key={entry.itemId}>
                                {`${itemList[entry.itemId].displayId} (${
                                    entry.count
                                })`}
                            </option>
                        ))}
                    </select>
                    <button
                        disabled={
                            selections.denjuuInstanceId === undefined ||
                            selections.itemId === undefined
                        } //This is weird cause we should never get to this state because of option defaulting behavior
                        onClick={() => {
                            dispatch(
                                itemThunk({
                                    instanceId: selections.denjuuInstanceId!,
                                    itemId: selections.itemId!,
                                })
                            );
                            selectionCallback();
                        }}
                    >
                        Use
                    </button>
                </ItemSelectorMenu>
            )}
        </div>
    );
};

const ItemSelectorMenu = styled.div({
    padding: '20px',
    backgroundColor: 'white',
});
