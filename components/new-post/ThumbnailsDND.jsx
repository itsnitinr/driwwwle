import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ThumbnailsDND = ({ images, setImages }) => {
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  }

  return (
    <div className="my-6">
      <h3 className="text-xl mb-1 font-semibold text-pink-600">
        Arrange Images
      </h3>
      <p className="mb-4 text-gray-500">
        The first image will be used as the thumbnail
      </p>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="thumbnails" direction="horizontal">
          {(provided) => (
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((image, index) => (
                <Draggable
                  key={image.path}
                  draggableId={image.path}
                  index={index}
                >
                  {(provided) => (
                    <img
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      src={URL.createObjectURL(image)}
                      className="w-full h-full rounded-lg shadow cursor-pointer object-cover"
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ThumbnailsDND;
