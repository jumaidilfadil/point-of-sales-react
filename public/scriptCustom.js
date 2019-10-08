$(function () {

	if(window.innerWidth <= 767)
	{
		$('#sidebar').removeClass('active');
	}

	// ------ Sidebar Collapse ------
	$('#sidebarCollapse').on('click', function() {
		// open sidebar
		$('#sidebar').toggleClass('active');
		if(window.innerWidth <= 767)
		{
			// fade in the overlay
			$('body').prepend('<div class="overlay"></div>');
			$('.overlay').fadeIn(300, function() {
				$('.overlay, #sidebar #dismiss').on('click', function() {
					// hide sidebar
					$('#sidebar').removeClass('active');
					// hide overlay
					$('.overlay').removeClass('active');
					$('.overlay').fadeOut(300, function() {
						$('.overlay').remove();
					});
				});
			});
			$('.collapse.in').toggleClass('in');
			$('a[aria-expanded=true]').attr('aria-expanded', 'false');
		}
	});
	// ------ Sidebar Collapse - AKHIR ------

});