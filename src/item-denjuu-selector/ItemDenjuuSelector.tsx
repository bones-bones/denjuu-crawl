import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { denjuuList } from '../data';
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
    const {
        inventory: { items },
        contactList,
    } = useSelector(({ inventory, contactList }: RootState) => ({
        inventory,
        contactList,
    }));
    const dispatch = useDispatch();
    const [selections, setSelection] = useState<SelectionOptions>({
        denjuuInstanceId,
        itemId,
    });
    console.log(selections);
    return (
        <ItemSelectorMenu>
            {!denjuuInstanceId && (
                <ItemSelectorMenu>
                    Select a denjuu to use this item on
                    <select
                        defaultValue={selections.denjuuInstanceId}
                        onChange={(changeEvent) => {
                            setSelection({
                                ...selections,
                                denjuuInstanceId: changeEvent.target.value,
                            });
                        }}
                    >
                        <option value={undefined} hidden>
                            select one
                        </option>
                        {contactList.denjuu.map((entry) => {
                            const template = denjuuList[entry.denjuuId];
                            return (
                                <option
                                    value={entry.instanceId}
                                    key={entry.instanceId}
                                >
                                    {`${template.displayId} (${entry.level})`}
                                </option>
                            );
                        })}
                    </select>
                </ItemSelectorMenu>
            )}
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
                                {`${itemList[entry.itemId].displayId} lv: ${
                                    entry.count
                                }`}
                            </option>
                        ))}
                    </select>
                </ItemSelectorMenu>
            )}
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
    );
};

const ItemSelectorMenu = styled.div({
    padding: '20px',
    backgroundColor: 'white',
});
