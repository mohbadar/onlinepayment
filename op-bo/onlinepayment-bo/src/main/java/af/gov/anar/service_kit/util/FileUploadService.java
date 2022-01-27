package af.gov.anar.service_kit.util;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;

/*
 * This class is to be used for all the file/attachment uploads
 **/

@Service
public class FileUploadService {

    /*
     *
     * function to save the attachment to the directory which is being taken from
     * properties file
     *
     * @Params file: the file to be saved
     *
     * @params uploadDirectory: the directory in which we want the file to be saved
     * Author: Jalil Haidari
     **/
    public String saveAttachment(MultipartFile file, String uploadDirectory) {

        String fileName = Long.toString(System.currentTimeMillis()).concat("_").concat(file.getOriginalFilename());
        File uploadFolder = new File(uploadDirectory);
        //System.out.println(">>>>>>>>>>> the dir:" + uploadDirectory);
        String finalPath = null;
        // create the root directory if it does not exist
        if (!uploadFolder.exists()) {
            uploadFolder.mkdir();
        }
        try {
            //System.out.println(
            //       ">>>>>>>>>>> the dir:" + uploadFolder.getAbsolutePath() + "/" + file.getOriginalFilename());
            File f = new File(uploadFolder.getAbsolutePath() + "/" + fileName);
            // create the file
            if (!f.exists()) {

                f.createNewFile();
            }
            FileOutputStream fout = new FileOutputStream(f);
            fout.write(file.getBytes());
            finalPath = f.getAbsolutePath();
            fout.close();

        } catch (Exception e) {

            System.out.println("Exception occured while uploading the attachment" + e.toString());

        }
        return finalPath;

    }

}

