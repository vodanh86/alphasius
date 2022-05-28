<?php
/**
 * Gym Master Header Functions And Definations
 *
 * @package gym-master
 */
 function gym_master_header_hook_callback(){
 	?>
	<div class="hgroup-wrap">
		
	    <div class="container">

	            <section class="site-branding">
	                <!-- site branding starting from here -->
	               

                	<?php $site_identity = get_theme_mod( 'site_identity_options', 'title-text' );

                	$title = get_bloginfo( 'name', 'display' );
                	$description    = get_bloginfo( 'description', 'display' );	

                	if ( 'logo-only' == $site_identity ) { 
                		if ( has_custom_logo() ){
                		the_custom_logo();
                		}
                	} elseif ( 'logo-text' == $site_identity ) {
                		if ( has_custom_logo() ) {
                			the_custom_logo();
                		}
                		if ( $description ) {
                			echo '<p class="site-description">'.esc_attr( $description ).'</p>';
                		}
                	} elseif ( 'title-only' == $site_identity && $title ) {

                		if ( is_front_page() && is_home() ) { ?>
                		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
                		<?php } else { ?>
                		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
                		<?php }

                	} elseif ( 'title-text' == $site_identity ) {
                		if ( $title ) {
                			if ( is_front_page() && is_home() ) { ?>
                			<h1 class="site-title">
                				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
                			</h1>
                			<?php } else { ?>
                				<h1 class="site-title">
                					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
	                			</h1>
                			<?php }
                		}
                		if ( $description ) {
                		echo '<p class="site-description">'.esc_attr( $description ).'</p>';	
                		}
                	}
                	?>
	                
	                <!-- <span class="site-description">satisfied home</span> -->

	            </section><!-- site branding ends here -->
                <div class="meanmenu-container"></div>
                <div id="navbar" class="navbar">
                    <nav id="site-navigation" class="navigation main-navigation">
                        <div class="menu-content-wrapper">
                            <?php
                            wp_nav_menu( array(
                                'theme_location'    => 'menu-1',
                                'container_class'   => 'menu-container'
                            ) );
                            ?>
                        </div>
                    </nav><!-- main-navigation ends here -->
                </div><!-- navbar ends here -->
	            <div class="header-information">

	               <div class="header-information-inner"> 
	                  <a href="javascript:void(0)" class="header-search-icon">
	                     <i class="fa fa-search"></i>
	                  </a>
	               </div>

	            </div>
	    </div>

	</div><!--hgroup-wrap-->
	
	<div class="header-search-input">
	    <?php get_search_form();?>
	</div><!--header-search-input-->

 <?php }
 add_action('gym_master_header_callback_action','gym_master_header_hook_callback');	
