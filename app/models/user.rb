class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable
  validates :name, :presence => true

  has_many :wikis
  after_initialize :set_role

  def set_role
    self.role ||= 'standard'
  end

  def standard?
    role == 'standard'
  end

  def premium?
    role == 'premium'
  end

  def admin?
    role == 'admin'
  end

  mount_uploader :avatar, AvatarUploader
end
