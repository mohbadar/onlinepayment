package af.asr.opbo.pda.service;

import af.asr.opbo.util.FileUploadService;
import af.asr.opbo.pda.model.PdaApplication;
import af.asr.opbo.pda.repository.PdaApplicationRepository;
import af.asr.opbo.util.HijriDateUtility;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.RandomAccessFileOrArray;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class PdaApplicationService {

    @Autowired
    private PdaApplicationRepository nidFamilyFormRepository;
    @Autowired
    private FileUploadService fileUploadService;


    @Value("${upload.pda.dir}")
    private String fileUploadDirectory;

    public Map<String, Object> save(String onlineFormFamilyNo, String familyNo, MultipartFile file) throws IOException {

        String uploadPath = this.fileUploadDirectory.concat(HijriDateUtility.getCurrentJalaliDateAsString());
        Map<String, Object>  response = new HashMap<>();

        PdaApplication nidFamilyForm = new PdaApplication();
        nidFamilyForm.setNidFamilyNo(familyNo);
        nidFamilyForm.setOnlineFormFamilyNo(onlineFormFamilyNo);
        nidFamilyForm.setDocOriginalName(file.getOriginalFilename());



        if(file == null){
            throw new RuntimeException("File Not Exist Exception");
        }

        String fileUrl = fileUploadService.saveAttachment(file, uploadPath);
        if (Objects.nonNull(fileUrl)) {
                nidFamilyForm.setDocPath(fileUrl);
        }

//        int pageNo = efficientPDFPageCount(fileUrl);
//        nidFamilyForm.setDocNumOfPages(pageNo);

        nidFamilyFormRepository.save(nidFamilyForm);

        response.put("status", HttpStatus.OK);
        return response;
    }

    public PdaApplication search(String familyNo){
        return nidFamilyFormRepository.findByNidFamilyNo(familyNo);
    }


    public Resource download(String uuid) throws IOException, InterruptedException, URISyntaxException {

        PdaApplication nidFamilyForm = nidFamilyFormRepository.findById(uuid).orElse(null);

        if(nidFamilyForm == null) return null;

        Path path = Paths.get(nidFamilyForm.getDocPath());
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        return resource;
    }

    public int  getNumberOfPdfPages(File file) throws IOException {
        PDDocument document = new PDDocument();
        document.save(file);
        return document.getNumberOfPages();
    }


    private int efficientPDFPageCount(String path) throws IOException {
        RandomAccessFileOrArray file = new RandomAccessFileOrArray(path, false, true );
        PdfReader reader = new PdfReader(String.valueOf(file));
        int ret = reader.getNumberOfPages();
        reader.close();
        return ret;
    }

    public Map<String, Object> getListOfUnVerifiedDocs(String vertificationType, String centerCode) {
        Map<String, Object> response = new HashMap<>();

        if(vertificationType.equalsIgnoreCase("CENTER")){
        //     response.put("data", nidFamilyFormRepository.findByVerifiedAndNidFamilyNoStartsWith(false, centerCode));
 //            response.put("data", nidFamilyFormRepository.findNidFamilyNoContaining(centerCode));
            response.put("data", nidFamilyFormRepository.findNidFamilyNoContainingAndRejectedAndVerified(centerCode,false, false));
        }else{
            response.put("data", nidFamilyFormRepository.findByVerifiedAndRejected(false,false));
        }

        response.put("status", HttpStatus.OK);
        return response;
    }

    public Map<String, Object> verify(String id) {
        Map<String, Object> response = new HashMap<>();

        PdaApplication pdaApplication= nidFamilyFormRepository.findById(id).orElse(null);

        if(pdaApplication == null)
            throw new RuntimeException("No Application Found Exception");

        pdaApplication.setVerified(true);
        nidFamilyFormRepository.save(pdaApplication);

        response.put("status", HttpStatus.OK);
        response.put("data", id);
        return response;
    }
}
