$(document).ready(function(){
    let zoom = 1;
    let left = 0;
    let top = 0;
    const moveIncrement = 10;

    // Only zoom when CTRL key is held down
    $('.img-container').on('wheel', function(e) {
        if (!e.ctrlKey) return; // Regular scroll if CTRL key is not held down

        e.preventDefault();

        // Zoom in/out based on wheel movement
        zoom += e.originalEvent.deltaY * -0.01;
        zoom = Math.min(Math.max(.125, zoom), 4);
        
        // Apply zoom
        $('#image1, #image2').css('transform', `scale(${zoom})`);
    });

    $('.images').on('mousemove', function(e) {
        if (zoom <= 1) return; // No need to move if not zoomed in

        let parentOffset = $(this).offset();
        let relX = e.pageX - parentOffset.left;
        let relY = e.pageY - parentOffset.top;

        // Set new position
        left = (relX / $(this).width()) * 100;
        top = (relY / $(this).height()) * 100;

        // Apply position
        $('#image1, #image2').css('left', -left + '%').css('top', -top + '%');
    });

    // Arrow keys to move image
    $(document).keydown(function(e) {
        if (zoom <= 1) return; // No need to move if not zoomed in

        switch(e.which) {
            case 37: // left
                left = Math.min(left + moveIncrement, 100);
                break;

            case 39: // right
                left = Math.max(left - moveIncrement, 0);
                break;

            case 38: // up
                top = Math.min(top + moveIncrement, 100);
                break;

            case 40: // down
                top = Math.max(top - moveIncrement, 0);
                break;

            default: return; // Exit if it's not an arrow key
        }
        e.preventDefault(); // Prevent the default action (scroll / move caret)

        // Apply position
        $('#image1, #image2').css('left', -left + '%').css('top', -top + '%');
    });
});
