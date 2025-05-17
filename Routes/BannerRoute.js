import express from "express";
import { createBanner, createBannerCard1, createBannerCard2, createBannerTopCard2, deleteBanner, deleteBannerCard1, deleteBannerCard2, deleteBannerTopCard2, GetBanner, GetBannerCard1, GetBannerCard1Id, GetBannerCard2, GetBannerCard2Id, GetBannerId, GetBannerTopCard2, GetBannerTopCard2Id, updateBanner, updateBannerCard1, updateBannerCard2, updateBannerTopCard2 } from "../controller/Banner.js";
import multer from "multer";
import { createService, createServiceTop, deleteService, deleteServiceTop, GetService, GetServiceId, GetServiceIdTop, GetServiceTop, updateService, updateServiceTop } from "../controller/Service.js";
import { createMeet, createMeetTop, deleteMeet, deleteMeetTop, GetMeet, GetMeetId, GetMeetIdTop, GetMeetTop, updateMeet, updateMeetTop } from "../controller/MeetDentistApi.js";
import { createAchievement, createAchievementTop, deleteAchievement, deleteAchievementTop, GetAchievement, GetAchievementId, GetAchievementTop, GetAchievementTopId, updateAchievement, updateAchievementTop } from "../controller/AchievementApi.js";
import { createPrice, createPriceTop, deletePrice, deletePriceTop, GetPrice, GetPriceId, GetPriceIdTop, GetPriceTop, updatePrice, updatePriceTop } from "../controller/PriceApi.js";
import { createNews, deleteNews, GetIdNews, GetNews, updateNews } from "../controller/NewsApi.js";
import { createTestimony, createTestimonyTop, deleteTestimony, deleteTestimonyTop, GetTestimony, GetTestimonyId, GetTestimonyIdTop, GetTestimonyTop, updateTestimony, updateTestimonyTop } from "../controller/TestimonyApi.js";
import { createGallery, deleteGallery, GetGallery, GetGalleryId, updateGallery } from "../controller/GalleryApi.js";
import { createBlog, createBlogTop, deleteBlog, deleteBlogTop, GetBlog, GetBlogId, GetBlogIdTop, GetBlogTop, updateBlog, updateBlogTop } from "../controller/BlogApi.js";
import { createQuote, deleteQuote, GetQuote, GetQuoteIdTop, updateQuote } from "../controller/QuoteApi.js";
import { createQuoteForm, deleteQuoteForm, GetQuoteForm, GetQuoteFormIdTop, updateQuoteForm } from "../controller/QuoteFormApi.js";
import { createAbout, deleteAbout, GetAbout, GetAboutId, updateAbout } from "../controller/About/AboutApi.js";
import { createGalleryData, deleteGalleryData, GetGalleryData, GetGalleryDataId, updateGalleryData } from "../controller/Gallery/GalleryApiData.js";
import { createContact, createContactTop, deleteContact, deleteContactTop, GetContact, GetContactId, GetContactTop, GetContactTopId, updateContact, updateContactTop } from "../controller/Contact/ContactApi.js";
import { createContactForm, deleteContactForm, GetContactForm, GetContactFormIdTop, updateContactForm } from "../controller/Contact/ContactFormApi.js";
import { createAppointmentForm, deleteAppointmentForm, GetAppointmentForm, GetAppointmentFormIdTop, updateAppointmentForm } from "../controller/Contact/AppointmentApi.js";
import { createDentacare, createDentacareImage, createDentacareTop, deleteDentacare, deleteDentacareImage, deleteDentacareTop, GetDentacare, GetDentacareId, GetDentacareImage, GetDentacareImageId, GetDentacareTop, GetDentacareTopId, updateDentacare, updateDentacareImage, updateDentacareTop } from "../controller/Dentacare.js";
import { createHomeAppointmentForm, deleteHomeAppointmentForm, GetHomeAppointmentForm, GetHomeAppointmentFormIdTop, updateHomeAppointmentForm } from "../controller/HomeAppointmentFormApi.js";


const route = express.Router();
const storage = multer.memoryStorage();  
// File filter for type validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, JPEG, PNG, and WEBP are allowed."), false);
    }
  };
  
  // Max file size = 2MB
  const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: fileFilter,
  });
  
  

// banner route 
route.post("/createbanner", upload.single("bannerimage"), createBanner);
route.get("/getbanner", GetBanner);
route.get("/getone/:id", GetBannerId);
route.put("/updatebanner/:id", upload.single("bannerimage"), updateBanner)
route.delete("/deletebanner/:id", deleteBanner);

// emergency route 
route.post("/createbannerCard1", createBannerCard1);
route.get("/getbannerCard1", GetBannerCard1);
route.get("/getonebannerCard1/:id", GetBannerCard1Id);
route.put("/updatebannerCard1/:id", updateBannerCard1)
route.delete("/deletebannerCard1/:id", deleteBannerCard1);

// opening hours top route 
route.post("/createbannerTopCard2", createBannerTopCard2);
route.get("/getbannerTopCard2", GetBannerTopCard2);
route.get("/getonebannerTopCard2/:id", GetBannerTopCard2Id);
route.put("/updatebannerTopCard2/:id", updateBannerTopCard2)
route.delete("/deletebannerTopCard2/:id", deleteBannerTopCard2);

// opening hours route 
route.post("/createbannerCard2", createBannerCard2);
route.get("/getbannerCard2", GetBannerCard2);
route.get("/getonebannerCard2/:id", GetBannerCard2Id);
route.put("/updatebannerCard2/:id", updateBannerCard2)
route.delete("/deletebannerCard2/:id", deleteBannerCard2);

// service top route 
route.post("/createservicetop", createServiceTop);
route.get("/getservicetop", GetServiceTop);
route.get("/getoneservicetop/:id", GetServiceIdTop);
route.put("/updateservicetop/:id", updateServiceTop)
route.delete("/deleteservicetop/:id", deleteServiceTop);

// service route 
route.post("/createservice", upload.single("serviceimage"), createService);
route.get("/getservice", GetService);
route.get("/getoneservice/:id", GetServiceId);
route.put("/updateservice/:id", upload.single("serviceimage"), updateService);
route.delete("/deleteservice/:id", deleteService);

// dentacaretop route 
route.post("/createdentacaretop", createDentacareTop);
route.get("/getdentacaretop", GetDentacareTop);
route.get("/getonedentacaretop/:id", GetDentacareTopId);
route.put("/updatedentacaretop/:id", updateDentacareTop);
route.delete("/deletedentacaretop/:id", deleteDentacareTop);

// dentacareimage route 
route.post("/createdentacareimage", upload.single("dentacareimage"), createDentacareImage);
route.get("/getdentacareimage", GetDentacareImage);
route.get("/getonedentacareimage/:id", GetDentacareImageId);
route.put("/updatedentacareimage/:id", upload.single("dentacareimage"), updateDentacareImage);
route.delete("/deletedentacareimage/:id", deleteDentacareImage);

// dentacare  route 
route.post("/createdentacare", createDentacare);
route.get("/getdentacare", GetDentacare);
route.get("/getonedentacare/:id", GetDentacareId);
route.put("/updatedentacare/:id", updateDentacare)
route.delete("/deletedentacare/:id", deleteDentacare);

// meet top route 
route.post("/createmeettop", createMeetTop);
route.get("/getmeettop", GetMeetTop);
route.get("/getonemeettop/:id", GetMeetIdTop);
route.put("/updatemeettop/:id", updateMeetTop)
route.delete("/deletemeettop/:id", deleteMeetTop);

// meet route 
route.post("/createmeet", upload.single("meetimage"), createMeet);
route.get("/getmeet", GetMeet);
route.get("/getonemeet/:id", GetMeetId);
route.put("/updatemeet/:id", upload.single("meetimage"), updateMeet);
route.delete("/deletemeet/:id", deleteMeet);

// achievement top route 
route.post("/createachievementtop", createAchievementTop);
route.get("/getachievementtop", GetAchievementTop);
route.get("/getoneachievementtop/:id", GetAchievementTopId);
route.put("/updateachievementtop/:id", updateAchievementTop)
route.delete("/deleteachievementtop/:id", deleteAchievementTop);

// achievement route 
route.post("/createachievement", createAchievement);
route.get("/getachievement", GetAchievement);
route.get("/getoneachievement/:id", GetAchievementId);
route.put("/updateachievement/:id", updateAchievement)
route.delete("/deleteachievement/:id", deleteAchievement);

// price top route 
route.post("/createpricetop", createPriceTop);
route.get("/getpricetop", GetPriceTop);
route.get("/getonepricetop/:id", GetPriceIdTop);
route.put("/updatepricetop/:id", updatePriceTop)
route.delete("/deletepricetop/:id", deletePriceTop);

// price route 
route.post("/createprice", createPrice);
route.get("/getprice", GetPrice);
route.get("/getoneprice/:id", GetPriceId);
route.put("/updateprice/:id", updatePrice);
route.delete("/deleteprice/:id", deletePrice);

// newsletter route 
route.post("/createnews", createNews);
route.get("/getnews", GetNews);
route.get("/getonenews/:id", GetIdNews);
route.put("/updatenews/:id", updateNews)
route.delete("/deletenews/:id", deleteNews);

// testimony top route 
route.post("/createtestimonytop", createTestimonyTop);
route.get("/gettestimonytop", GetTestimonyTop);
route.get("/getonetestimonytop/:id", GetTestimonyIdTop);
route.put("/updatetestimonytop/:id", updateTestimonyTop)
route.delete("/deletetestimonytop/:id", deleteTestimonyTop);

// testimony route 
route.post("/createtestimony", upload.single("testimonyimage"), createTestimony);
route.get("/gettestimony", GetTestimony);
route.get("/getonetestimony/:id", GetTestimonyId);
route.put("/updatetestimony/:id", upload.single("testimonyimage"), updateTestimony);
route.delete("/deletetestimony/:id", deleteTestimony);

// gallery route 
route.post("/creategallery", upload.single("galleryimage"), createGallery);
route.get("/getgallery", GetGallery);
route.get("/getonegallery/:id", GetGalleryId);
route.put("/updategallery/:id", upload.single("galleryimage"), updateGallery);
route.delete("/deletegallery/:id", deleteGallery);

// blog top route 
route.post("/createblogtop", createBlogTop);
route.get("/getblogtop", GetBlogTop);
route.get("/getoneblogtop/:id", GetBlogIdTop);
route.put("/updateblogtop/:id", updateBlogTop)
route.delete("/deleteblogtop/:id", deleteBlogTop);

// blog route 
route.post("/createblog", upload.single("blogimage"), createBlog);
route.get("/getblog", GetBlog);
route.get("/getoneblog/:id", GetBlogId);
route.put("/updateblog/:id", upload.single("blogimage"), updateBlog);
route.delete("/deleteblog/:id", deleteBlog);

// Quote route 
route.post("/createQuote", createQuote);
route.get("/getQuote", GetQuote);
route.get("/getoneQuote/:id", GetQuoteIdTop);
route.put("/updateQuote/:id", updateQuote)
route.delete("/deleteQuote/:id", deleteQuote);

// QuoteForm route 
route.post("/createQuoteForm", createQuoteForm);
route.get("/getQuoteForm", GetQuoteForm);
route.get("/getoneQuoteForm/:id", GetQuoteFormIdTop);
route.put("/updateQuoteForm/:id", updateQuoteForm)
route.delete("/deleteQuoteForm/:id", deleteQuoteForm);

// About route 
route.post("/createAbout", upload.single("aboutimage"), createAbout);
route.get("/getAbout", GetAbout);
route.get("/getoneAbout/:id", GetAboutId);
route.put("/updateAbout/:id", upload.single("aboutimage"), updateAbout);
route.delete("/deleteAbout/:id", deleteAbout);

// Gallery Data route 
route.post("/createGalleryData", upload.single("gallerydataimage"), createGalleryData);
route.get("/getGalleryData", GetGalleryData);
route.get("/getoneGalleryData/:id", GetGalleryDataId);
route.put("/updateGalleryData/:id", upload.single("gallerydataimage"), updateGalleryData);
route.delete("/deleteGalleryData/:id", deleteGalleryData);

// Contact top route 
route.post("/createContacttop", createContactTop);
route.get("/getContacttop", GetContactTop);
route.get("/getoneContacttop/:id", GetContactTopId);
route.put("/updateContacttop/:id", updateContactTop)
route.delete("/deleteContacttop/:id", deleteContactTop);

// Contact route 
route.post("/createContact", createContact);
route.get("/getContact", GetContact);
route.get("/getoneContact/:id", GetContactId);
route.put("/updateContact/:id", updateContact)
route.delete("/deleteContact/:id", deleteContact);

// ContactForm route 
route.post("/createContactForm", createContactForm);
route.get("/getContactForm", GetContactForm);
route.get("/getoneContactForm/:id", GetContactFormIdTop);
route.put("/updateContactForm/:id", updateContactForm)
route.delete("/deleteContactForm/:id", deleteContactForm);

// AppointmentForm route 
route.post("/createAppointmentForm", createAppointmentForm);
route.get("/getAppointmentForm", GetAppointmentForm);
route.get("/getoneAppointmentForm/:id", GetAppointmentFormIdTop);
route.put("/updateAppointmentForm/:id", updateAppointmentForm)
route.delete("/deleteAppointmentForm/:id", deleteAppointmentForm);

// HomeAppointmentForm route 
route.post("/createHomeAppointmentForm", createHomeAppointmentForm);
route.get("/getHomeAppointmentForm", GetHomeAppointmentForm);
route.get("/getoneHomeAppointmentForm/:id", GetHomeAppointmentFormIdTop);
route.put("/updateHomeAppointmentForm/:id", updateHomeAppointmentForm)
route.delete("/deleteHomeAppointmentForm/:id", deleteHomeAppointmentForm);
export default route;