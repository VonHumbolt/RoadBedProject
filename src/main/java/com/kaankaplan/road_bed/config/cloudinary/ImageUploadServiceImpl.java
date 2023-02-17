package com.kaankaplan.road_bed.config.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Service
public class ImageUploadServiceImpl implements ImageUploadService {

    private final Cloudinary cloudinary;

    @Autowired
    public ImageUploadServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public Map uploadImage(MultipartFile multipartFile) {

        Map uploadResult = null;
        try{
            File file = convertMultipartFileToFile(multipartFile);
            uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
            file.delete();

        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return uploadResult;
    }

    private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));

        FileOutputStream stream = new FileOutputStream(file);

        stream.write(multipartFile.getBytes());
        stream.close();

        return file;
    }

    @Override
    public Map deleteImage(String imageId) {
        Map result = null;
        try {
            result = cloudinary.uploader().destroy(imageId, Map.of());
        }catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
}
