import { findListItemsInSameThread } from '../../modelApi/list/findListItemsInSameThread';
import { formatWithContentModel } from '../utils/formatWithContentModel';
import { getFirstFocusedListItem } from '../../modelApi/list/getFirstFocusedListItem';
import { IExperimentalContentModelEditor } from '../../publicTypes/IExperimentalContentModelEditor';
import { ListMetadataFormat } from '../../publicTypes/format/formatParts/ListMetadataFormat';

/**
 * Set style of list items with in same thread of current item
 * @param editor The editor to operate on
 * @param style The target list item style to set
 */
export default function setListStyle(
    editor: IExperimentalContentModelEditor,
    style: ListMetadataFormat
) {
    formatWithContentModel(editor, 'setListStyle', model => {
        const listItem = getFirstFocusedListItem(model);

        if (listItem) {
            const listItems = findListItemsInSameThread(model, listItem);
            const levelIndex = listItem.levels.length - 1;

            listItems.forEach(listItem => {
                if (style.orderedStyleType !== undefined) {
                    listItem.levels[levelIndex].orderedStyleType = style.orderedStyleType;
                }

                if (style.unorderedStyleType !== undefined) {
                    listItem.levels[levelIndex].unorderedStyleType = style.unorderedStyleType;
                }
            });

            return true;
        } else {
            return false;
        }
    });
}