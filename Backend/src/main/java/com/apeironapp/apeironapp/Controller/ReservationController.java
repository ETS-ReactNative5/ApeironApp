package com.apeironapp.apeironapp.Controller;


import com.apeironapp.apeironapp.DTO.*;
import com.apeironapp.apeironapp.Model.*;
import com.apeironapp.apeironapp.Repository.CourirRepository;
import com.apeironapp.apeironapp.Service.IServices.IReservationService;
import com.apeironapp.apeironapp.Service.IServices.UserService;
import com.apeironapp.apeironapp.Service.Implementations.ItemInOrderService;
import com.apeironapp.apeironapp.Service.Implementations.ItemService;
import com.apeironapp.apeironapp.Service.Implementations.RegisteredUserService;
import com.apeironapp.apeironapp.Service.Implementations.ReservationService;
import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.websocket.server.PathParam;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping(value = "/api/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private CourirRepository courirRepository;
    @Autowired
    private RegisteredUserService registeredUserService;


    @Autowired
    private UserService userService;

    @Autowired
    private ItemService itemService;

    @PostMapping("/add")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<String> addReservation(@RequestBody NewOrderDTO newOrderDTO) {

       Order order = reservationService.save(newOrderDTO);

        return order == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                new ResponseEntity<>("Item is successfully added!", HttpStatus.CREATED);
    }

    @GetMapping("/couriers")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Courier>> couriers() {


        List<Courier> courier = courirRepository.findAll();

        return courier == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                ResponseEntity.ok(courier);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<ReservationDTO>> all() {
        BufferedImage img = null;
        List<Order> orders = reservationService.findAll();
        List<ReservationDTO> reservationDTOS = new ArrayList<ReservationDTO>();

        for (Order order : orders) {

                        ReservationDTO reservationDTO = new ReservationDTO();
                        reservationDTO.setReservationId(order.getId());
                        reservationDTO.setDateOfReservation(order.getDateOfReservation());
                        reservationDTO.setDueDate(order.getDueDate());
                        if(order.getCourier()!=null) {
                            reservationDTO.setCourier(order.getCourier().getCompany());
                        }
                        Set<ItemInOrderDTO> itemInOrderDTOSet = new HashSet<ItemInOrderDTO>();

                        for (ItemInOrder item : order.getItems()) {
                            Set<String> list = new HashSet<String>();
                            for (Pictures pictures : item.getItem().getPictures()) {
                                File destination = new File("src/main/resources/images/" + pictures.getName());
                                try {
                                    img = ImageIO.read(destination);
                                    ByteArrayOutputStream out = new ByteArrayOutputStream();
                                    ImageIO.write(img, "PNG", out);
                                    byte[] bytes = out.toByteArray();
                                    String base64bytes = Base64.getEncoder().encodeToString(bytes);
                                    String src = "data:image/png;base64," + base64bytes;
                                    list.add(src);

                                } catch (IOException e) {
                                    e.printStackTrace();
                                }

                            }

                            ItemInOrderDTO item1 = new ItemInOrderDTO();
                            reservationDTO.setItemId(item.getId());
                            reservationDTO.setFiles(list);
                            reservationDTO.setUser(order.getRegisteredUser().getEmail());
                            reservationDTO.setPhone(order.getRegisteredUser().getPhoneNumber());
                            reservationDTO.setItemGender(item.getItem().getGender());
                            reservationDTO.setItemName(item.getItem().getName());
                            reservationDTO.setItemType(item.getItem().getType());
                            reservationDTO.setStatus(order.getStatus());
                            item1.setColor(item.getColor());
                            item1.setItemId(item.getId());
                            item1.setQuantity(item.getQuantity());
                            item1.setSize(item.getSize());
                            itemInOrderDTOSet.add(item1);


                        }
                        reservationDTO.setItemInOrderDTOSet(itemInOrderDTOSet);

                        if(reservationDTOS.contains(reservationDTO)){
                            break;
                        }else{
                            reservationDTOS.add(reservationDTO);
                        }



                    }


            return reservationDTOS == null ?
                    new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                    ResponseEntity.ok(reservationDTOS);
        }

    @GetMapping("/allUser")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<ReservationDTO>> allUser() {

        BufferedImage img = null;
        List<Order> orders = reservationService.findAll();
        List<ReservationDTO> reservationDTOS = new ArrayList<ReservationDTO>();

        RegisteredUser registeredUser = registeredUserService.getLoggedUser();
        System.out.println(registeredUser);
        for (Order order : orders) {
            if(order.getRegisteredUser().getId()==registeredUser.getId()) {
                ReservationDTO reservationDTO = new ReservationDTO();

                reservationDTO.setReservationId(order.getId());
                reservationDTO.setDateOfReservation(order.getDateOfReservation());
                reservationDTO.setDueDate(order.getDueDate());
                Set<ItemInOrderDTO> itemInOrderDTOSet = new HashSet<ItemInOrderDTO>();

                for (ItemInOrder item : order.getItems()) {

                    Set<String> list = new HashSet<String>();
                    for (Pictures pictures : item.getItem().getPictures()) {
                        File destination = new File("src/main/resources/images/" + pictures.getName());
                        try {
                            img = ImageIO.read(destination);
                            ByteArrayOutputStream out = new ByteArrayOutputStream();
                            ImageIO.write(img, "PNG", out);
                            byte[] bytes = out.toByteArray();
                            String base64bytes = Base64.getEncoder().encodeToString(bytes);
                            String src = "data:image/png;base64," + base64bytes;
                            list.add(src);

                        } catch (IOException e) {
                            e.printStackTrace();
                        }

                    }


                    ItemInOrderDTO item1 = new ItemInOrderDTO();
                    reservationDTO.setItemId(item.getId());
                    reservationDTO.setFiles(list);
                    reservationDTO.setItemGender(item.getItem().getGender());
                    reservationDTO.setItemName(item.getItem().getName());
                    reservationDTO.setItemType(item.getItem().getType());
                    item1.setColor(item.getColor());
                    item1.setItemId(item.getId());
                    item1.setQuantity(item.getQuantity());
                    item1.setSize(item.getSize());
                    itemInOrderDTOSet.add(item1);


                }
                reservationDTO.setItemInOrderDTOSet(itemInOrderDTOSet);

                if (reservationDTOS.contains(reservationDTO)) {
                    break;
                } else {
                    reservationDTOS.add(reservationDTO);
                }

            }


        }


        return reservationDTOS == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                ResponseEntity.ok(reservationDTOS);
    }


    @GetMapping("/remove/{id}")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<String> remove(@PathVariable Integer id) {

       Order order = reservationService.findById(id);
        reservationService.delete(order);

        return order == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                new ResponseEntity<>("Item is successfully deleted!", HttpStatus.CREATED);
    }


    @GetMapping("/generateQR/{id}/{courier}")
    // @PreAuthorize("hasRole('PHARMACIST')")
    @CrossOrigin
    public void generateQRcode(@PathVariable Integer id,@PathVariable Integer courier) throws WriterException, IOException
    {

        System.out.println(courier);
        Order order = reservationService.findById(id);
        Courier courier1 = userService.findByIdCourier(courier);


        String path = "src/main/resources/images/" + id + ".png";
        order.setQr(path);
        order.setStatus("SENT");
        order.setCourier(courier1);

        reservationService.update(order);
        String charset = "UTF-8";
        Map<EncodeHintType, ErrorCorrectionLevel> hashMap = new HashMap<EncodeHintType, ErrorCorrectionLevel>();
        hashMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);


        BitMatrix matrix = new MultiFormatWriter().encode(order.toString(), BarcodeFormat.QR_CODE, 200, 200);
        MatrixToImageWriter.writeToFile(matrix, path.substring(path.lastIndexOf('.') + 1), new File(path));
    }

    @GetMapping("/getQR")
    // @PreAuthorize("hasRole('PHARMACIST')")
    @CrossOrigin
    public ResponseEntity<List<QRDTO>> getQR() throws WriterException, IOException
    {

        List<Order> orders = reservationService.findAll();
        BufferedImage img = null;
        List<QRDTO> qrdtoList = new ArrayList<QRDTO>();
        Set<String> list = new HashSet<String>();
        for (Order order: orders) {
            QRDTO qrdto = new QRDTO();
            File destination = new File(order.getQr());
            try {
                img = ImageIO.read(destination);
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                ImageIO.write(img, "PNG", out);
                byte[] bytes = out.toByteArray();
                String base64bytes = Base64.getEncoder().encodeToString(bytes);
                String src = "data:image/png;base64," + base64bytes;
                list.add(src);
                qrdto.setFiles(list);
                qrdto.setUser(order.getRegisteredUser().getEmail());
            } catch (IOException e) {
                e.printStackTrace();
            }
            qrdtoList.add(qrdto);
        }


        return qrdtoList == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                ResponseEntity.ok(qrdtoList);
    }


    @GetMapping("/getQRCourier")
    // @PreAuthorize("hasRole('PHARMACIST')")
    @CrossOrigin
    public ResponseEntity<List<QRDTO>> getQRCourier() throws WriterException, IOException
    {
        Courier courier = registeredUserService.getLoggedCourier();
        List<Order> orders = reservationService.findAll();



        BufferedImage img = null;
        List<QRDTO> qrdtoList = new ArrayList<QRDTO>();
        Set<String> list = new HashSet<String>();
        for (Order order: orders) {
            if(order.getCourier().getId() == (courier.getId())) {
                QRDTO qrdto = new QRDTO();
                File destination = new File(order.getQr());
                try {
                    img = ImageIO.read(destination);
                    ByteArrayOutputStream out = new ByteArrayOutputStream();
                    ImageIO.write(img, "PNG", out);
                    byte[] bytes = out.toByteArray();
                    String base64bytes = Base64.getEncoder().encodeToString(bytes);
                    String src = "data:image/png;base64," + base64bytes;
                    list.add(src);
                    qrdto.setFiles(list);
                    qrdto.setUser(order.getRegisteredUser().getEmail());
                } catch (IOException e) {
                    e.printStackTrace();
                }
                qrdtoList.add(qrdto);
            }
        }


        return qrdtoList == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                ResponseEntity.ok(qrdtoList);
    }


}
