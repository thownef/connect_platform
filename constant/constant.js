export const QUERY_UPDATE_PROFILE = {
  QUERY_INFO:
    'INSERT INTO company_info (`email`, `user_id`, `company_logo`, `estalishment`, `employers`, `needs_vn`,`needs_en`,`needs_jp`, `category`, `capital`, `address_vn`, `address_en`,`address_jp`, `languages`, `logo_associations`, `info_url`) VALUES ?',
  QUERY_DESC:
    'INSERT INTO company_description (`email`, `user_id`, `description`, `descriptionEN`, `descriptionJP`) VALUES ?',
  QUERY_PRODUCTS:
    'INSERT INTO company_products (`email`, `user_id`, `product_name`,`product_name_EN`,`product_name_JP`, `product_description`,`product_description_EN`,`product_description_JP`, `product_picture`, `product_url`) VALUES ?',
  QUERY_SPECIALTIES:
    'INSERT INTO company_specialties (`email`, `user_id`, `speciality_picture`, `speciality_desc`, `speciality_desc_en`, `speciality_desc_jp`) VALUES ?',
  QUERY_CORE_MEMBERS:
    'INSERT INTO company_core_members (`email`, `user_id`, `member_name`, `member_position`,`member_position_EN`,`member_position_JP`, `member_picture`, `member_desc`, `member_desc_EN`, `member_desc_JP`) VALUES ?',
  QUERY_MAIN_CLIENTS:
    'INSERT INTO company_main_clients (`email`, `user_id`, `client_name`, `client_logo`, `client_url`, `client_url_EN`, `client_url_JP`) VALUES ?',
  QUERY_UPDATE_PRODUCT:
    'UPDATE company_products SET product_name = ?, product_name_EN = ?, product_name_JP = ?, product_description = ?, product_description_EN = ?, product_description_JP = ?, product_picture = ?, product_url = ? WHERE id = ?',
  QUERY_UPDATE_FEATURES:
    'UPDATE company_specialties SET speciality_desc = ?, speciality_desc_en = ?, speciality_desc_jp = ?, speciality_picture = ? WHERE id = ?',
  QUERY_UPDATE_CORE_MEMBER:
    'UPDATE company_core_members SET member_desc = ?, member_desc_EN = ?, member_desc_JP = ?, member_name = ?, member_picture = ?, member_position = ?, member_position_EN = ?, member_position_JP = ? WHERE id = ?',
  QUERY_UPDATE_CLIENT:
    'UPDATE company_main_clients SET client_name = ?, client_logo = ?, client_url = ?, client_url_EN = ?, client_url_JP = ?  WHERE id = ?',
  QUERY_UPDATE_INFO:
    'UPDATE company_info SET estalishment = ?, employers = ?, needs_vn = ?, needs_en = ?, needs_jp = ?, company_logo = ?, languages = ?, category = ?, capital = ?, address_vn = ?, address_en = ?, address_jp = ?, info_url =? WHERE id = ?',
};
