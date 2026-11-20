package com.organization.NoMindF.Controller.admin;

// TODO: ImageFile model and AdminGalleryService are not yet implemented.
// This controller is temporarily disabled until those classes are created.

// import com.organization.NoMindF.Model.ImageFile;
// import com.organization.NoMindF.Service.AdminGalleryService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.IOException;
// import java.util.List;

// @RestController
// @RequestMapping("/")
// public class AdminGalleryController {
//     @Autowired
//     AdminGalleryService adminGalleryService;
//     @PostMapping("uploadImages")
//     public ResponseEntity<?> uploadImages(@RequestParam("files")MultipartFile[] files) throws IOException
//     {
//         List<ImageFile> images = adminGalleryService.uploadMultiple(files);
//         return ResponseEntity.status(HttpStatus.OK).body("Image added successfully");
//     }
// }
