$(document).ready(function(){
    const moveIncrement = 10;

    $('.img-container').each(function() {
        let zoom = 1;
        let left = 0;
        let top = 0;

        const hammertime = new Hammer(this);

        // Listen to pinch events
        hammertime.get('pinch').set({ enable: true });
        hammertime.on('pinchin pinchout', function(e) {
            // Zoom in/out based on pinch movement
            if (e.type == 'pinchin') {
                zoom -= 0.1;
            } else if (e.type == 'pinchout') {
                zoom += 0.1;
            }

            zoom = Math.min(Math.max(.125, zoom), 4);

            // Apply zoom
            $('#image1, #image2').css('transform', `scale(${zoom})`);
        });

        $(this).on('mousemove', function(e) {
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

        $(this).on('wheel', function(e) {
            e.preventDefault();

            // Zoom in/out based on wheel movement
            zoom += e.originalEvent.deltaY * -0.01;
            zoom = Math.min(Math.max(.125, zoom), 4);
            
            let offsetX = e.originalEvent.pageX - $(this).offset().left;
            let offsetY = e.originalEvent.pageY - $(this).offset().top;
            
            // Set the transform origin so it zooms to where the mouse is
            $('#image1, #image2').css('transform-origin', offsetX + 'px ' + offsetY + 'px');
            
            // Apply zoom
            $('#image1, #image2').css('transform', `scale(${zoom})`);
        });

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

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)

            // Apply position
            $('#image1, #image2').css('left', -left + '%').css('top', -top + '%');
        });
    });
});
