<?php
/**
* Intro Section
*
* @package gym-master
* 
*/
if (get_theme_mod('gym_master_info_option','no')=='yes') {  ?>
	<?php
	$image = get_theme_mod('gym_master_info_image',''); 
	$bg_class = '';
	if ( !empty( $image ) ){
		$bg_class = 'background-image';
	}
	?>
	<section class="client-info-section <?php echo esc_attr( $bg_class );?>">

		<?php if( !empty( $image) ) { ?>
	   		 <div class="section-bg-img" style="background-image: url( <?php echo esc_url($image); ?> )"></div>	
		<?php } ?>

	    <div class="container">
	        <div class="client-info-left">

	            <!-- ************************** Starting Inner Here *****************-->
	           <div class="client-info-wrap">

	               <div class="client-info-content  animated wow fadeInUp" data-wow-delay="0.5s" style="background-color:white; color:black">

		               	<?php 
							$counter_page  = get_theme_mod('gym_master_counter_page_one',0);
							$first_counter_number = get_theme_mod('first_counter_number',100);
		               	  ?>
						<!-- ************************** Counter Title Subtitle and Features Image First  *****************-->

						<?php   if( !empty( $counter_page ) ): 

							$args = array (                                 
							'page_id'           => absint( $counter_page ),
							'post_status'       => 'publish',
							'post_type'         => 'page',
							);

							$loop = new WP_Query($args);

							if ( $loop->have_posts() ) : ?>	

								<?php while ($loop->have_posts()) : $loop->the_post();?>
				
				                   <h3 class="entry-title" style="    font-size: 56px;
    line-height: 56px;
    color: black!important;
	font-weight: 900">

				                     	<?php the_title(); ?>

				                   </h3>

				                   <div class="entry-content" style="color:black;font-size: 20px;
    text-align: justify;">
				                   		<?php echo get_the_content(); ?>
										   <ul class="navbar-nav ml-auto main-nav" style="display:flex; flex-direction:row">
												<li class="nav-item"><div class="nav-link"><a href="https://apps.apple.com/app/id1511450771" target="_blank"><img src="https://www.vintageradio.sg/public/images/app-store.svg" alt="logo" width="120px" height="40px"></a></div></li>
												<li class="nav-item"><div class="nav-link"><a href="https://play.google.com/store/apps/details?id=com.mvp_mobile" target="_blank"><img src="https://www.vintageradio.sg/public/images/google-play-badge.png" alt="logo" width="120px" height="40px"></a></div></li>
												
											</ul>
				                   	</div>

			                   <?php endwhile; 
					 		   wp_reset_postdata();?>

			            <?php endif;

			            endif;

			            ?> 
		                   
	               </div>

	               <?php 
	                $counter_page_two  = get_theme_mod('gym_master_counter_page_two',0);
	                $second_counter_number = get_theme_mod('second_counter_two',200);
	                ?>
					
					<!-- ************************** Counter Title Subtitle and Features Image First  *****************-->

					<?php   if( !empty( $counter_page_two ) ): 

						$args = array (                                 
						'page_id'           => absint( $counter_page_two ),
						'post_status'       => 'publish',
						'post_type'         => 'page',
						);

						$loop = new WP_Query($args);

						if ( $loop->have_posts() ) : ?>	

							<?php while ($loop->have_posts()) : $loop->the_post();?>

				               <div class="client-info-content  animated wow fadeInUp" data-wow-delay="0.5s">
				                   <h3 class="entry-title">
				                       <span class="count"> <?php echo absint($second_counter_number); ?> </span>
				                 	  <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
				               		</h3>
				                   <div class="entry-content"><?php echo esc_html(wp_trim_words(get_the_content(),13,'...')); ?> </div>
				               </div>

                           <?php endwhile; 
        		 		   wp_reset_postdata();?>  

        		 	<?php endif;

        		 	endif;

        		 	?> 	    
					
	               <?php 
	               	$counter_page_three  = get_theme_mod('gym_master_counter_page_three',0);
	                $third_counter_three = get_theme_mod('third_counter_three',300);
	                ?>
					
					<!-- ************************** Counter Title Subtitle and Features Image First  *****************-->

					<?php   if( !empty( $counter_page_three ) ): 

						$args = array (                                 
						'page_id'           => absint( $counter_page_three ),
						'post_status'       => 'publish',
						'post_type'         => 'page',
						);

						$loop = new WP_Query($args);

						if ( $loop->have_posts() ) : ?>	

							<?php while ($loop->have_posts()) : $loop->the_post();?>  

				               <div class="client-info-content  animated wow fadeInUp" data-wow-delay="0.5s">
				                   <h3 class="entry-title">
				                       <span class="count"> <?php echo absint($third_counter_three); ?> </span>

				                	   <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>

				             		</h3>

				                   <div class="entry-content"> <?php echo esc_html(wp_trim_words(get_the_content(),13,'...')); ?> </div>

				               </div>

		                   <?php endwhile; 
				 		   wp_reset_postdata();?>  
					 		   
					 	<?php endif;

					 	endif;

					 	?>

					<?php 
					 $counter_page_four  = get_theme_mod('gym_master_counter_page_four',0);
					 $fourth_counter_number = get_theme_mod('four_counter_four',400);
					 ?>	

					 <!-- ************************** Counter Title Subtitle  *****************-->

					<?php   if( !empty( $counter_page_four ) ): 

						$args = array (                                 
						'page_id'           => absint( $counter_page_four ),
						'post_status'       => 'publish',
						'post_type'         => 'page',
						);

						$loop = new WP_Query($args);

						if ( $loop->have_posts() ) : ?>	

						<?php while ($loop->have_posts()) : $loop->the_post();?>  

			               <div class="client-info-content  animated wow fadeInUp" data-wow-delay="0.5s">
			                   <h3 class="entry-title">
			                       <span class="count"> <?php echo absint($fourth_counter_number); ?>  </span>
			                 		<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			              		</h3>
			                   <div class="entry-content"> <?php echo esc_html(wp_trim_words(get_the_content(),13,'...')); ?></div>
			               </div>

	                   <?php endwhile; 
			 		   wp_reset_postdata();?>  

			 	<?php endif;

			 	endif;
			 	?> 	    
	           </div>
	        </div>
	    </div>
	</section><!--.client-info-section-->
<?php } ?>		