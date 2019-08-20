var mongoose=require("mongoose");
var Campground=require("./model/campgrounds.js");
var Comment=require("./model/comments.js");
var data=[{
   name:"Devon,England",
   image:"https://img.hipcamp.com/image/upload/c_fill,f_auto,h_504,q_60,w_770/v1434685609/campground-photos/bza3pamfftyarxe1z4fm.jpg",
   description:"It is one of the most beautiful campgrounds"},
   {name:"Skane, Sweden",image:"https://www.aworldtotravel.com/wp-content/uploads/2018/04/us-free-camping-spots-around-the-world-a-world-to-travel.jpg",
    description:"It is the heaven on earth!!!Truely beautiful"},
    {name:"Eagle Meadow, US",image:"https://img.hipcamp.com/images/c_limit,f_auto,h_1200,q_60,w_1920/v1445211528/campground-photos/tn2d5xis8xfocsnpeven/west-eagle-meadow-campground.jpg",
    description:"Pretty, private, and open to the public, West Eagle Meadow Campground is a hidden gem well worth the extra effort. Jagged rock formations, wildflower covered meadows and wildlife (deer, jackrabbits) await hikers braving the journey. The campground offers tent/small trailer campsites, walk-in tent sites, and a picnic area."},
    {name:"Trout Farm, England",image:"https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1433542898/dqsambvsm62vylhrfl9z.jpg",
    description:"Nostalgic for simpler times? Head out to Trout Farm Campground and leave that weekday grind behind. The campground’s six first-come, first-served sites (picnic table included!) sit along the stocked Trout Farm pond and connect to Trout Farm Trail, where you can work up a sweat and take in killer views of the water. Grab your pole and get out to the pier!"},
    {name:"Aurora, Norway",image:"https://img.hipcamp.com/images/c_limit,f_auto,h_1200,q_60,w_1920/v1528832412/campground-photos/ihaygjuf2ibjkbmbelzc/star-gazer-aurora-outfitters-nw.jpg",
     description:"This camp site offers some shade from the heat and a great view of the Milky Way bands of stars. This camp site is beautifully landscaped by nature filled with Juniper,White sage, and wild Orchids."},
    {name:"Big Creek, France",image:"https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1433542896/iwdb8fsdfcimsbswtbwu.jpg",
    description:"ust south of the deliciously named Strawberry Mountains in the Logan Valley is where you’ll find this mile high 15-site campground! For $8 a night ($4 for an additional vehicle), you’ll enjoy all the beauty and solitude Mother Nature can offer, plus drinking water, vault toilets and picnic tables. This site is open year round and can accommodate trailers up to 30 feet, just beware that during winter months the site is only accessible by snowmobile, ski or snowshoe."}
    ];
function seed()
{
  
	Campground.remove( {},function(err) { 
		if(err){
			console.log(err);
		}else {
			console.log("Campground Removed");
		}
	});
		data.forEach( function(campground) {
		Campground.create(campground,function(err,campground) {
			if(err){
				console.log(err);
			}else{
          console.log("Campground Created!");
      }
  });
  });
}
module.exports=seed;