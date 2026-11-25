import datetime
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPFound,
    HTTPNotFound,
    HTTPBadRequest,
)
from ..models import MataKuliah

# Read ALL: Menampilkan daftar seluruh mata kuliah
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """View untuk mengambil semua data mata kuliah"""
    dbsession = request.dbsession
    matakuliahs = dbsession.query(MataKuliah).order_by(MataKuliah.id.asc()).all()
    return {'matakuliahs': [m.to_dict() for m in matakuliahs]}

# Read ONE: Menampilkan detail satu mata kuliah berdasarkan ID
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """View untuk melihat detail satu mata kuliah berdasarkan ID di URL"""
    dbsession = request.dbsession
    matakuliah_id = int(request.matchdict['id'])
    matakuliah = dbsession.query(MataKuliah).filter_by(id=matakuliah_id).first()

    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Mata Kuliah dengan ID {matakuliah_id} tidak ditemukan'})

    return {'matakuliah': matakuliah.to_dict()}

# Create: Menambahkan data mata kuliah baru
@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    """View untuk menambahkan mata kuliah baru dari payload JSON"""
    try:
        json_data = request.json_body

        # Validasi field wajib
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in json_data or not json_data[field]:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi!'})

        for field in ('sks', 'semester'):
            if type(json_data[field]) is not int or json_data[field] <= 0:
                return HTTPBadRequest(json_body={'error': f'Field {field} harus berupa bilangan bulat positif!'})

        matakuliah = MataKuliah(
            kode_mk=json_data['kode_mk'],
            nama_mk=json_data['nama_mk'],
            sks=json_data['sks'],
            semester=json_data['semester']
        )

        dbsession = request.dbsession
        dbsession.add(matakuliah)
        dbsession.flush()  # Memastikan ID di-generate sebelum commit

        return {'message': 'Mata Kuliah berhasil ditambahkan', 'matakuliah': matakuliah.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})

# Update: Mengubah data mata kuliah berdasarkan ID
@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    """View untuk mengubah data mata kuliah berdasarkan ID di URL"""
    dbsession = request.dbsession
    matakuliah_id = int(request.matchdict['id'])
    matakuliah = dbsession.query(MataKuliah).filter_by(id=matakuliah_id).first()

    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Mata Kuliah dengan ID {matakuliah_id} tidak ditemukan'})

    try:
        json_data = request.json_body

        for field in ('sks', 'semester'):
            if field in json_data and (type(json_data[field]) is not int or json_data[field] <= 0):
                return HTTPBadRequest(json_body={'error': f'Field {field} harus berupa bilangan bulat positif!'})

        # Update field jika ada di payload
        for field in ['kode_mk', 'nama_mk', 'sks', 'semester']:
            if field in json_data:
                setattr(matakuliah, field, json_data[field])

        dbsession.flush()  # Memastikan perubahan tersimpan sebelum commit

        return {'message': 'Mata Kuliah berhasil diperbarui', 'matakuliah': matakuliah.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})

# Delete: Menghapus data mata kuliah berdasarkan ID
@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    """View untuk menghapus data mata kuliah berdasarkan ID di URL"""
    dbsession = request.dbsession
    matakuliah_id = int(request.matchdict['id'])
    matakuliah = dbsession.query(MataKuliah).filter_by(id=matakuliah_id).first()

    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Mata Kuliah dengan ID {matakuliah_id} tidak ditemukan'})

    dbsession.delete(matakuliah)
    dbsession.flush()  # Memastikan penghapusan tersimpan sebelum commit

    return {'message': 'Mata Kuliah berhasil dihapus', 'matakuliah': matakuliah.to_dict()}
