$(document).ready(function(){
    // Initialize zoom level and position
    let zoom = 1;
    let left = 0;
    let top = 0;
  
    $('.img-container').on('wheel', function(e) {
        e.preventDefault();

        // Zoom in/out based on wheel movement
        zoom += e.originalEvent.deltaY * -0.01;
        zoom = Math.min(Math.max(.125, zoom), 4);
        
        // Apply zoom
        $('#image1, #image2').css('transform', `scale(${zoom})`);
    });

    $('.img-container').on('mousemove', function(e) {
        if (zoom <= 1) return; // No need to move if not zoomed in

        let parentOffset = $(this).parent().offset();
        let relX = e.pageX - parentOffset.left;
        let relY = e.pageY - parentOffset.top;

        // Set new position
        left = (relX / $(this).width()) * 100;
        top = (relY / $(this).height()) * 100;

        // Apply position
        $('#image1, #image2').css('left', -left + '%').css('top', -top + '%');
    });
});
