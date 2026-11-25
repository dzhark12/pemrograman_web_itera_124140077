"""rename mata_kuliah table

Revision ID: 0d215b5928bd
Revises: bdf2e9756d65
Create Date: 2026-11-25 21:05:19.237996

"""
from alembic import op


# revision identifiers, used by Alembic.
revision = '0d215b5928bd'
down_revision = 'bdf2e9756d65'
branch_labels = None
depends_on = None


def upgrade():
    op.rename_table('mata_kuliah', 'matakuliah')


def downgrade():
    op.rename_table('matakuliah', 'mata_kuliah')
