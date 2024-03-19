import { db } from '../connect.js';
import { QUERY_UPDATE_PROFILE } from '../constant/constant.js';

export const updateProfile = (req, res) => {
  let valuesProducts = [];
  let valuesSpecialties = [];
  let valuesCoreMembers = [];
  let valuesMainClients = [];

  let valuesCompanyInfo = [
    [
      req.body.info[0].email,
      req.body.info[0].user_id,
      req.body.info[0].company_logo,
      req.body.info[0].estalishment,
      req.body.info[0].employers,
      req.body.info[0].needs_vn,
      req.body.info[0].needs_en,
      req.body.info[0].needs_jp,
      req.body.info[0].ceategory,
      req.body.info[0].capital,
      req.body.info[0].address_vn,
      req.body.info[0].address_en,
      req.body.info[0].address_jp,
      req.body.info[0].languages,
      req.body.info[0].logo_associations,
      req.body.info[0].info_url,
    ],
  ];

  let valuesDesc = [
    [
      req.body.info[0].email,
      req.body.info[0].user_id,
      req.body.description.description,
      req.body.description.descriptionEN,
      req.body.description.descriptionJP,
    ],
  ];

  for (let index = 0; index < req.body.products.length; index++) {
    valuesProducts = [
      ...valuesProducts,
      [
        req.body.info[0].email,
        req.body.info[0].user_id,
        req.body.products[index].product_name,
        req.body.products[index].product_name_EN,
        req.body.products[index].product_name_JP,
        req.body.products[index].product_description,
        req.body.products[index].product_description_EN,
        req.body.products[index].product_description_JP,
        req.body.products[index].product_picture,
        req.body.products[index].product_url,
      ],
    ];
  }

  for (let index = 0; index < req.body.specialities.length; index++) {
    valuesSpecialties = [
      ...valuesSpecialties,
      [
        req.body.info[0].email,
        req.body.info[0].user_id,
        req.body.specialities[index].speciality_picture,
        req.body.specialities[index].speciality_desc,
        req.body.specialities[index].speciality_desc_en,
        req.body.specialities[index].speciality_desc_jp,
      ],
    ];
  }

  for (let index = 0; index < req.body.members.length; index++) {
    valuesCoreMembers = [
      ...valuesCoreMembers,
      [
        req.body.info[0].email,
        req.body.info[0].user_id,
        req.body.members[index].member_name,
        req.body.members[index].member_position,
        req.body.members[index].member_position_EN,
        req.body.members[index].member_position_JP,
        req.body.members[index].member_picture,
        req.body.members[index].member_desc,
        req.body.members[index].member_desc_JP,
        req.body.members[index].member_desc_EN,
      ],
    ];
  }

  for (let index = 0; index < req.body.clients.length; index++) {
    valuesMainClients = [
      ...valuesMainClients,
      [
        req.body.info[0].email,
        req.body.info[0].user_id,
        req.body.clients[index].client_name,
        req.body.clients[index].client_logo,
        req.body.clients[index].client_url,
        req.body.clients[index].client_url_EN,
        req.body.clients[index].client_url_JP,
      ],
    ];
  }
    db.query(
      QUERY_UPDATE_PROFILE.QUERY_INFO,
      [valuesCompanyInfo],
      (err, data) => {
        if (err) {
          return res.status(500).json({ message: 'Internal Server Error!' });
        }

        db.query(QUERY_UPDATE_PROFILE.QUERY_DESC, [valuesDesc], (err, data) => {
          if (err) {
            return res.status(500).json({ message: 'Internal Server Error!' });
          }

          db.query(
            QUERY_UPDATE_PROFILE.QUERY_PRODUCTS,
            [valuesProducts],
            (err, data) => {
              if (err) {
                return res
                  .status(500).json({ message: 'Internal Server Error!' });
              }

              db.query(
                QUERY_UPDATE_PROFILE.QUERY_SPECIALTIES,
                [valuesSpecialties],
                (err, data) => {
                  if (err) {
                    return res
                      .status(500).json({ message: 'Internal Server Error!' });
                  }

                  db.query(
                    QUERY_UPDATE_PROFILE.QUERY_CORE_MEMBERS,
                    [valuesCoreMembers],
                    (err, data) => {
                      if (err) {
                        return res
                          .status(500).json({ message: 'Internal Server Error!' });
                      }

                      db.query(
                        QUERY_UPDATE_PROFILE.QUERY_MAIN_CLIENTS,
                        [valuesMainClients],
                        (err, data) => {
                          if (err) {
                            return res
                              .status(500).json({ message: 'Internal Server Error!' });
                          }
                          return res
                            .status(200).json({ message: 'Create Profile Success' });
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        });
      }
    );
};
