export  enum GraphEventType {
    /**
     * Use this event type when a new grpah is created
     */
    NEW,
    /**
     * Use this event type to open an grpah in a board
     */
    OPEN,
    /**
     * Indicate a change to the grpah, e.g. name changed
     */
    CHANGED,
    /**
     * The grpah has been closed from the tab
     */
    CLOSED,
    /**
     * Indicate to remove a grpah
     */
    REMOVE,
    /**
     * Event when the graph was removed successfully
     */
    REMOVED,
    /**
     * Start dragging a graph
     */
    DRAGGING,
    /**
     * Graph has been droped
     */
    DRAG_END,
    /**
     * Remove all items in the selection buffers
     * from the grpah
     */
    REMOVE_SELECTION,
    /**
     * Indicate to select all nodes and edges of a grpaph
     */
    SELECT_ALL,
    /**
     * In dicate that a selection started,
     * e.g. in order to enable button in the command bar
     */
    SELECTING_START,
    /**
     * Indicate that the selection buffers are empty
     */
    SELECTING_END
}

