Aggregate = {
  call: function (_collection, _pipeline, _options, wrapperFieldName = 'data', onlyCount = false, includeDeleted = false) {
    const result = {
      options: {
        pagination: {},
        sorting: {}
      }
    };

    result[wrapperFieldName] = [];

    let pipeline = _pipeline;

    if (!includeDeleted) {
      pipeline.push({ $match: { removedAt: { $exists: false } } });
    }

    if (_options?.filtering) {
      keyword = _options.filtering.keyword;

      if (keyword) {
        pipeline.unshift({ $match: { $text: { $search: keyword } } });
      }

      const filterQuery = Object.keys(_options.filtering).reduce(function (obj, key) {
        if (key === 'keyword') {
          return obj;
        }

        let value = _options.filtering[key]

        if (value === 'true') {
          value = true;
        }

        if (value === 'false') {
          value = false;
        }

        if (value['$gte'] || value['$lte'] || value == true || value == false) {
          obj[key] = value;
          return obj;
        }

        obj[key] = {
          $regex: `${value}`,
          $options: 'i'
        };

        return obj;
      }, {});

      if (Object.keys(filterQuery).length > 0) {
        pipeline.push({ $match: filterQuery });
      }
    }

    if (_options?.searching) {
      const $or = []
      Object.keys(_options.searching).reduce(function (obj, key) {
        let _obj = {};

        _obj[key] = {
          $regex: `${_options.searching[key]}`,
          $options: 'i'
        };
        $or.push(_obj);
      }, {});

      pipeline.push({ $match: { $or: $or } });
    }

    pipeline.push({ $count: "count" });
    const count = _collection.aggregate(pipeline)[0]?.count;

    result.options.pagination.currentPage = 1;
    result.options.pagination.pageItems = count || _options?.pagination?.pageItems || 0;
    result.options.pagination.totalCount = count || 0;

    pipeline.splice(-1, 1); // son eklenen count değeri siliniyor.

    if (!count) // count undefined ise zaten sonuç yoktur sorguyu bitiriyorum.
      return result;

    if (onlyCount)
      return count;

    if (_options?.sorting) {
      const sort = {}
      sort[_options.sorting.sortField] = _options.sorting.sortOrder === 'asc' ? 1 : -1;
      pipeline.push({ $sort: sort });
      result.options.sorting = sort;
    }

    if (_options?.pagination) {
      pipeline.push({ $skip: (_options.pagination.currentPage - 1) * _options.pagination.pageItems });
      pipeline.push({ $limit: _options.pagination.pageItems });

      result.options.pagination.currentPage = _options.pagination.currentPage;
      result.options.pagination.pageItems = _options.pagination.pageItems;
    }

    result.options.pagination.totalPages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);

    result[wrapperFieldName] = _collection.aggregate(pipeline);
    return result;
  },

  /**
   * pipeline                   => Sorugunun ekleneceği array,
   * from                       => Hangi collectiondan,
   * localField                 => İstek atılan collectiondaki alan,
   * foreignField               => Verinin aranacağı collectiondaki alan,
   * path                       => Gelen verinin konacağı alan,
   * preserveNullAndEmptyArrays => Eğer true olursa varsada yoksada o alan geri dönecektir.
   */
  addLookup: function (pipeline, from, localField, foreignField, path, preserveNullAndEmptyArrays = false) {
    pipeline.push(
      {
        $lookup: {
          from: from,
          localField: localField,
          foreignField: foreignField,
          as: path
        },
      },
      {
        $unwind: {
          path: `$${path}`,
          preserveNullAndEmptyArrays: preserveNullAndEmptyArrays
        }
      });
  },

  /**
   * 
   * pipeline  => Sorugunun ekleneceği array,
   * fields    => Sonuçta olmasını istediğimiz alanları belirtiğimiz dizi,
   */
  createProject: function (pipeline, fields) {
    const $project = {
      _id: 1,
      updatedAt: 1,
      createdAt: 1,
      removedAt: 1,
    }

    fields.forEach(field => {

      if (typeof field === 'object') {

        const key = Object.keys(field)[0];

        const _in = { _id: "$$u._id" };
        const obj = {
          $let: {
            vars: {
              u: `$${key}`
            },
            in: _in,
          },
        }

        field[key].forEach(f => {
          _in[f] = `$$u.${f}`;
        });

        $project[key] = obj;

      } else {
        $project[field] = 1;
      }

    });

    pipeline.push({ $project: $project });
  },

  methods: {
    admin: {
      channels: {
        list: function (pipeline) {

          Aggregate.addLookup(pipeline, 'connectors', 'connectorId', '_id', 'connector');
          Aggregate.addLookup(pipeline, 'shops', 'slug', 'slug', 'shop');

          Aggregate.createProject(pipeline, [
            'connectorId',
            'clientId',
            'isVerified',
            'slug',
            'name',
            'title',
            'avatarUrl',
            'payload',

            'connector',
            { 'shop': ['name', 'slug', 'logoUrl'] }
          ]);

          return pipeline;
        },
      }
    }
  }
}