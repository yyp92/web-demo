import { rectSortingStrategy } from "@dnd-kit/sortable";
import { MultipleContainers } from "./examples/Sortable/MultipleContainers";

export const DndKit = () => {
    return (
        <div className="dndKit">
            <MultipleContainers
                itemCount={5}
                strategy={rectSortingStrategy}
                vertical
            />
        </div>
    );
}